import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import User from 'App/Models/User'
import TaskMentorManager from 'App/Models/TaskMentorManager'
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
      .whereNull('deleted_at')
      .select('*')
    return { status: 'success', message: 'Fetched all mentor mangers successful', mentorManagers }
  }

  async search({ request, response }: HttpContextContract) {
    const query = request.input('query')

    const res = await User.query()
      .where((queryBuilder) => {
        queryBuilder
          .whereRaw('lower(first_name) like ?', [`%${query.toLowerCase()}%`])
          .orWhereRaw('lower(last_name) like ?', [`%${query.toLowerCase()}%`])
      })
      .where('roleId', Roles.MENTOR_MANAGER)
      .whereNull('deleted_at')

    return response.ok(res)
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

      return response.status(200).json({
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
}
