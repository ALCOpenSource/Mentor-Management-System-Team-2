import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Criterion from 'App/Models/Criterion'

export default class CriteriaController {
  public async index({ auth, response, request }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const { page, limit, query } = request.qs()
    const criteria = await Criterion.query()
      .where((queryBuilder) => {
        queryBuilder.whereRaw('lower(skill) like ?', [`%${query?.toLowerCase() || ''}%`])
      })
      .paginate(page || 1, limit || 10)
    return { status: 'success', message: 'Fetched all criterion successful', criteria }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    try {
      if (auth.user?.id) {
        const userId = auth.user?.id
        const payload = await request.validate({
          schema: schema.create({
            skill: schema.string(),
            projectLinks: schema.array().members(schema.string()),
            experience: schema.boolean(),
            attachments: schema.array().members(
              schema.file({
                size: '2mb',
                extnames: ['pdf'],
              })
            ),
          }),
        })

        const criterion = new Criterion()
        criterion.userId = userId
        criterion.skill = payload.skill
        criterion.projectLinks = payload.projectLinks
        criterion.experience = payload.experience

        const attachmentsPath: string[] = []

        if (payload.attachments) {
          const files = request.files('attachments')
          for (let file of files) {
            await file.moveToDisk('upload_file')
            attachmentsPath.push(file.fileName ?? '')
          }
        }
        criterion.attachments = attachmentsPath

        await criterion.save()
        response.ok({ success: criterion })
      }
    } catch (error) {
      response.badGateway({ success: false, message: error })
    }
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    try {
      if (auth.user?.id) {
        const userId = auth.user?.id
        const { skill, projectLinks, experience, attachments } = await request.validate({
          schema: schema.create({
            skill: schema.string.optional(),
            projectLinks: schema.array().members(schema.string()),
            experience: schema.boolean.optional(),
            attachments: schema.array().members(
              schema.file({
                size: '2mb',
                extnames: ['pdf'],
              })
            ),
          }),
        })

        const criterion = await Criterion.findOrFail(params.id)
        criterion.userId = userId

        if (skill) criterion.skill = skill

        if (projectLinks) criterion.projectLinks = [...projectLinks]

        if (experience) criterion.experience = experience

        if (attachments) {
          const attachmentsPath: string[] = []
          const files = request.files('attachments')

          for (let file of files) {
            await file.moveToDisk('upload_file')
            attachmentsPath.push(file.fileName ?? '')
          }

          criterion.attachments = attachmentsPath
        }

        await criterion.save()
        response.ok({ success: criterion })
      }
    } catch (error) {
      response.badGateway({ success: false, message: error })
    }
  }
}
