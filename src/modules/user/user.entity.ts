import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
import { ManyToMany } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne((type) => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({name: 'detail_id'})
  details: UserDetails;

  @ManyToMany(type => Role, user => user.users, { eager: true })
  @JoinTable({name: 'user_roles'})
  roles: Role[]

  @ManyToMany(type => Book, book => book.authors)
  @JoinTable({name: 'user_books'})
  books: Book[]

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  estatus: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;
}
