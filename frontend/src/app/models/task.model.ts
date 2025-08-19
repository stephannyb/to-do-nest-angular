export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: 'low' | 'normal' | 'high' | 'critical';
  category: 'home' | 'work' | 'personal' | 'shopping';
  dueDate?: string;
}