import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users'

@Entity('logs')
class Logs {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  log_user:string

  @ManyToOne(() => User)
  @JoinColumn({name:'log_user'})
  log: User;

  @Column()
  tag: string;

  @Column()
  name: string;

  @Column('time with time zone')
  date: Date;
}

export default Logs;
