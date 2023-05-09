import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'
import { nanoid } from 'nanoid'
import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthenticationController {
  public async getAllUsers({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }

    const { page, limit, search } = request.qs()

    let query = User.query()

    if (search) {
      query = query.where((builder) => {
        builder.where('firstName', 'like', `%${search}%`).orWhere('lastName', 'like', `%${search}%`)
      })
    }

    const users = await query.paginate(page, limit)

    return { status: 'success', message: 'Fetched all user successful', users }
  }

  public async getAllMentors({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const mentors = await User.query()
      .where('roleId', Roles.MENTOR)
      .whereNull('deleted_at')
      .select(['id', 'firstName', 'lastName', 'roleId'])
    return { status: 'success', message: 'Fetched all mentors successful', mentors }
  }

  public async getAllMentorManagers({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const mentorManagers = await User.query()
      .where('roleId', Roles.MENTOR_MANAGER)
      .whereNull('deleted_at')
      .select(['id', 'firstName', 'lastName', 'roleId'])
    return { status: 'success', message: 'Fetched all mentor mangers successful', mentorManagers }
  }

  async inviteUser({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }

    try {
      const { email, firstName, lastName, roleId } = request.only([
        'email',
        'firstName',
        'lastName',
        'roleId',
      ])
      const password = 's'
      const inviteCode = nanoid()
      const user = await User.findBy('email', email)

      if(user) throw new Error("User already exist");

      const newUser = new User()
      newUser.fill({ email, firstName, lastName, roleId, inviteCode, password })
      newUser.save()

      const url = `${Env.get('FRONTEND_URL_INVITATION')}?invitation=${inviteCode}`

      await Mail.send((message) => {
        message
          .from('MMM2@example.com')
          .to(email)
          .subject(`You've been invited to mentor aspiring professionals`)
          .html(
            `Hello ${firstName},\n I hope this email finds you well. We are excited to invite you to join our mentorship program. \n \n  If you're interested in becoming a mentor, please click on the following link to accept the invitation: ${url}`
          )
      })

      response.accepted({ message: 'invitation link successfully send' })
    } catch (error) {
      response.badRequest({ message: `${error}` })
    }
  }
}
