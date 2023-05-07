import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import User from 'App/Models/User'
import TaskMentorManager from 'App/Models/TaskMentorManager'
import Database from '@ioc:Adonis/Lucid/Database'
import Roles from 'App/Enums/Roles'

export default class MentorManagerController {
  async getAllMentorManagers({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const mentorManagers = await User.query()
      .where('roleId', Roles.MENTOR_MANAGER)
      .select(['id', 'firstName', 'lastName'])
    return { status: 'success', message: 'Fetched all mentor mangers successful', mentorManagers }
  }

  async getMentorManagerTask({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const { search } = request.all()
      const tasks = await Task.query()
        .whereHas('mentorManagers', (builder) => {
          builder.where('mentor_manager_id', params.mentorManagerId)
        })
        .where((query) => {
          if (search) {
            query
              .whereRaw('LOWER(title) LIKE ?', [`%${search.toLowerCase()}%`])
              .orWhereRaw('LOWER(description) LIKE ?', [`%${search.toLowerCase()}%`])
          }
        })
        .preload('mentorManagers')
        .preload('taskReports')
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .exec()

      const tasksWithCounts = tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          meta: task.meta,
          creatorUserId: task.userId,
          createdBy: `${task.user.firstName} ${task.user.lastName}`,
          startDate: task.startDate,
          endDate: task.endDate,
          typeOfReport: task.typeOfReport,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          reports: task.taskReports?.map((report) => ({
            id: report.id,
            achievement: report.achievement,
            blocker: report.blocker,
            recommendation: report.recommendation,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
          })),
          taskReportCount: task.taskReports.length,
        }
      })

      return response
        .status(200)
        .json({
          status: 'success',
          message: 'Mentor Manager Tasks fetched successfully',
          data: tasksWithCounts,
        })
    } catch (error) {
      return response.status(500).send({ message: 'Error fetching task.' })
    }
  }

  async removeMentorManagerFromTask({ auth, params, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }
    try {
      const { taskId, mentorManagerId } = params

      const taskMentor = await TaskMentorManager.query()
        .where('taskId', taskId)
        .where('mentorManagerId', mentorManagerId)
        .first()

      if (!taskMentor) {
        return response.badRequest({ message: 'Mentor manager not found for this task' })
      }

      await taskMentor.delete()

      return response.ok({ status: 'success', message: 'Mentor manager removed from task' })
    } catch (error) {
      return response.status(500).send({ message: 'Error removing mentor manager from task.' })
    }
  }

  async deleteAMentorManager({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const { mentorManagerId } = params

    try {
      await Database.transaction(async (trx) => {
        const result = await User.query()
          .where('id', mentorManagerId)
          .andWhere('roleId', Roles.MENTOR_MANAGER)
          .firstOrFail()
        result.useTransaction(trx).delete()
        const taskMentorManagers = await TaskMentorManager.query()
          .where('id', mentorManagerId)
          .preload('task')
          .useTransaction(trx)
        taskMentorManagers.map(async (taskMentorManager) => {
          await taskMentorManager.useTransaction(trx).delete()
          const task = taskMentorManager.task
          await task.related('mentorManagers').detach([mentorManagerId])
        })
      })

      return response.ok({ message: 'Mentor Manager deleted successfully' })
    } catch (error) {
      response.badRequest({ message: 'Error deleting User', status: 'Error' })
    }
  }
}
