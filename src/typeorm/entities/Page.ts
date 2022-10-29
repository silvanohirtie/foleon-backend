import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pages' })
export class Page {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true, default: null })
  paragraph?: string | null;

  @Column({ nullable: true, default: null })
  title?: string | null;

  @Column({ nullable: true, default: null })
  quote?: string | null;

  @Column({ nullable: true, default: null })
  image_id?: number | null;

  @Column({ default: new Date().toISOString() })
  created_at: string;
}
