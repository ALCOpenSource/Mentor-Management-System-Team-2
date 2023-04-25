import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'dim2though@gmail.com',
        password: 'test12345678',
        firstName: 'aliyu',
        lastName: 'Olad',
        bio: "I don't have a bio"
      },
      {
        email: 'test@gmail.com',
        password: 'test12345678',
        firstName: 'aliyu',
        lastName: 'Olad',
        bio: "I don't have a bio"
      },
      {
        email: 'dim2though@gmail.com',
        password: 'test12345678',
        firstName: 'Segun',
        lastName: 'Oyinlola',
        bio: "I don't have a bio"
      }
    ])
  }
}
