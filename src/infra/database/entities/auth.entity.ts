import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("auth")
export class AuthDBEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({
    name: "phone_number",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phoneNumber!: string;

  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
