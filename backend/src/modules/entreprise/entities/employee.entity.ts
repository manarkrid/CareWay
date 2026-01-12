import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  activityRate: number;

  @Column({ default: 0 })
  absenceDays: number;

  @Column({ 
    type: 'enum', 
    enum: ['Disponible', 'En trajet', 'Indisponible'],
    default: 'Disponible'
  })
  status: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}