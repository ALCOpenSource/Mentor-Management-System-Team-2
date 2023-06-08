import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Program from 'App/Models/Program'
import ProgramReport from 'App/Models/ProgramReport'
import Task from 'App/Models/Task'
import TaskReport from 'App/Models/TaskReport'
import ProgramCertificate from 'App/Models/ProgramsCertificate'
import Database from '@ioc:Adonis/Lucid/Database'
export default class SearchController {
    async search({ auth, response, request }: HttpContextContract) {
        const user = auth.user!
    
        if (!user.isAdmin) {
          response.unauthorized({ message: 'You are not authorized to access this resource.' })
          return
        }
        const { page, limit, query } = request.qs()
        try {
            const programsQuery = Program.query()
            .where('name', 'ilike', `%${query}%`)
            .orWhere('description', 'ilike', `%${query}%`)
            .andWhere('isArchive', false)
            .select(Database.raw("'Program' as table_name"), '*')
      
          const programReportsQuery = ProgramReport.query()
            .where('achievement', 'ilike', `%${query}%`)
            .orWhere('blocker', 'ilike', `%${query}%`)
            .orWhere('recommendation', 'ilike', `%${query}%`)
            .select(Database.raw("'ProgramReport' as table_name"), '*')
      
          const tasksQuery = Task.query()
            .where('title', 'ilike', `%${query}%`)
            .orWhere('description', 'ilike', `%${query}%`)
            .select(Database.raw("'Task' as table_name"), '*')
      
          const taskReportsQuery = TaskReport.query()
            .where('achievement', 'ilike', `%${query}%`)
            .orWhere('blocker', 'ilike', `%${query}%`)
            .orWhere('recommendation', 'ilike', `%${query}%`)
            .select(Database.raw("'TaskReport' as table_name"), '*')
      
          const programCertificatesQuery = ProgramCertificate.query()
            .where('programNameUrl', 'ilike', `%${query}%`)
            .orWhere('certification', 'ilike', `%${query}%`)
            .select(Database.raw("'ProgramCertificate' as table_name"), '*')
      
          const searchResults = await Database
            .from(programsQuery.unionAll(programReportsQuery)
              .unionAll(tasksQuery)
              .unionAll(taskReportsQuery)
              .unionAll(programCertificatesQuery)
              .as('search_results'))
            .paginate(page || 1, limit || 10)
      
          return searchResults
            
        } catch (error) {
            return response.badRequest({
                message: `No search found`,
                status: 'error',
                error
              })
        }
}
}