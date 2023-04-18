import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import Roles from 'App/Enums/Roles'
import TaskMentor from 'App/Models/TaskMentor'
import TaskMentorManager from 'App/Models/TaskMentorManager'
import Database from '@ioc:Adonis/Lucid/Database'



export default class TaskController {
  async create({ auth, request, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const { title, description, meta, startDate, endDate, typeOfReport, mentors, mentorManagers } =
      request.only([
        'title',
        'description',
        'meta',
        'startDate',
        'endDate',
        'typeOfReport',
        'mentors',
        'mentorManagers',
      ])

    try {
      const task = await Database.transaction(async (trx) => {
        const task = new Task()

        task.fill({
          title,
          description,
          meta,
          userId: adminUser.id,
          startDate,
          endDate,
          typeOfReport,
        })

        await task.useTransaction(trx).save()

        if (mentors && mentors.length > 0) {
          for (const mentorId of mentors) {
            const taskMentor = new TaskMentor()

            taskMentor.fill({
              taskId: task.id,
              mentorId,
            })

            await taskMentor.useTransaction(trx).save()
          }
        }

        if (mentorManagers && mentorManagers.length > 0) {
          for (const mentorManagerId of mentorManagers) {
            const taskMentorManager = new TaskMentorManager()

            taskMentorManager.fill({
              taskId: task.id,
              mentorManagerId,
            })

            await taskMentorManager.useTransaction(trx).save()
          }
        }

        return task
      })

      return response.status(201).json(task)
    } catch (error) {
      return response.status(500).send({ message: 'Error creating task.' })
    }
  }

  async update({ auth, params, request, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const { title, description, meta, startDate, endDate, typeOfReport, mentors, mentorManagers } =
      request.only([
        'title',
        'description',
        'meta',
        'startDate',
        'endDate',
        'typeOfReport',
        'mentors',
        'mentorManagers',
      ])

    const taskId = params.id

    try {
      const task = await Database.transaction(async (trx) => {
        const task = await Task.findOrFail(taskId)

        task.merge({
          title,
          description,
          meta,
          startDate,
          endDate,
          typeOfReport,
        })

        await task.useTransaction(trx).save()

        if (mentors && mentors.length > 0) {
          const taskMentors = mentors.map((mentorId: number) => ({
            taskId,
            mentorId,
          }))

          await TaskMentor.query().useTransaction(trx).where('taskId', taskId).delete()

          await TaskMentor.createMany(taskMentors)
        }

        if (mentorManagers && mentorManagers.length > 0) {
          const taskMentorManagers = mentorManagers.map((mentorManagerId: number) => ({
            taskId,
            mentorManagerId,
          }))

          await TaskMentorManager.query().useTransaction(trx).where('taskId', taskId).delete()

          await TaskMentorManager.createMany(taskMentorManagers)
        }

        return task
      })

      return response.status(200).json(task)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ message: 'Error updating task.' })
    }
  }

  async show({ auth, params, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const taskId = params.taskId
    console.log(taskId)

    const task = await Task.query()
      .where('id', taskId)
      .preload('mentors')
      .preload('mentorManagers')
      .first()

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    return response.ok(task)
  }
  async index({ auth, response, request }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const { page, limit } = request.qs()

    try {
      const tasks = await Task.query()
        .preload('user')
        .preload('mentors')
        .preload('mentorManagers')
        .paginate(page ||  1, limit || 10)

      return response.status(200).json(tasks)
    } catch (error) {
      return response.status(500).send({ message: 'Error retrieving tasks.' })
    }
  }

  async delete({ auth, params, response }: HttpContextContract) {
    const adminUser = await auth.authenticate();
  
    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' });
    }
  
    const taskId = params.taskId;
  
    const task = await Task.query().where('id', taskId).first();
  
    if (!task) {
      return response.notFound({ message: 'Task not found' });
    }
  
    try {
      await Database.transaction(async (trx) => {
        await TaskMentor.query().where('taskId', taskId).useTransaction(trx).delete();
        await TaskMentorManager.query().where('taskId', taskId).useTransaction(trx).delete();
        await task.useTransaction(trx).delete();
      });
  
      return response.ok({ message: 'Task deleted successfully' });
    } catch (error) {
      return response.status(500).send({ message: 'Error deleting task' });
    }
  }
  
}
