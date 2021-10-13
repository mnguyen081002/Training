import { classToPlain, Exclude } from 'class-transformer';
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Post } from './Post';
import config from '../config/config';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  token?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  toJson() {
    return classToPlain(this);
  }

  isValidPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  generateToken() {
    const token = jwt.sign({ id: this.id }, config.secret);
    return token;
  }
}
