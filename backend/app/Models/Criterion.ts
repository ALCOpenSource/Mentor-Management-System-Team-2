import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Program from './Program'
import User from './User'

export default class Criterion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public programId: number

  @column()
  public skill: string

  @column()
  public projectLinks: string[]

  @column()
  public experience: boolean

  @column()
  public attachments: string[]

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Program)
  public program: BelongsTo<typeof Program>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
