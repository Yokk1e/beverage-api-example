import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Beverage } from '../beverages/beverages/beverage.entity';
import { BeverageOption } from '../beverages/beverage-options/beverage-option.entity';

export default class SetupBeverage implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Beverage)
      .values([
        {
          name: 'ชานมไข่มุก',
          price: 80,
        },
        {
          name: 'นมสดวานิลา',
          price: 75,
        },
        {
          name: 'ชาเขียวมัทฉะ',
          price: 100,
        },
        {
          name: 'ชาไทยเย็น',
          price: 75,
        },
      ])
      .execute();

    const tea = await connection
      .getRepository(Beverage)
      .createQueryBuilder('beverage')
      .where('beverage.name = :name', { name: 'ชาเขียวมัทฉะ' })
      .getOne();

    await connection
      .createQueryBuilder()
      .insert()
      .into(BeverageOption)
      .values([
        {
          name: 'ไข่มุก',
          price: 30,
          beverage: tea,
        },
        {
          name: 'เพิ่มหวาน 50%',
          price: 10,
          beverage: tea,
        },
        {
          name: 'เพิ่มหวาน 100%',
          price: 15,
          beverage: tea,
        },
      ])
      .execute();
  }
}
