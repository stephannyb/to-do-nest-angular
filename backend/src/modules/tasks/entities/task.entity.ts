import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TaskPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum TaskCategory {
  HOME = 'home',
  WORK = 'work',
  PERSONAL = 'personal',
  SHOPPING = 'shopping',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.NORMAL,
  })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: TaskCategory,
    default: TaskCategory.PERSONAL,
  })
  category: TaskCategory;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;
}