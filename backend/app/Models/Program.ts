import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import UserProgram from './UserProgram'
import ProgramReport from './ProgramReport'
import ProgramCriterion from './ProgramCriterion'

export default class Program extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public gravatar: string

  @column()
  public isArchive: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => UserProgram)
  public userPrograms: HasMany<typeof UserProgram>

  @hasMany(() => ProgramCriterion)
  public programCriteria: HasMany<typeof ProgramCriterion>

  @hasMany(() => ProgramReport)
  public programReports: HasMany<typeof ProgramReport>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public users?: any

  @column()
  public criteria: any

}
