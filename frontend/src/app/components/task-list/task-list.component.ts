import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [DatePipe] // Adiciona o DatePipe para ser usado no código
})
export class TaskListComponent implements OnInit {

  // Propriedades da Classe
  tasks: Task[] = [];
  groupedTasks: { [key: string]: Task[] } = {
    home: [], work: [], personal: [], shopping: []
  };
  taskInModal: Partial<Task> = {};
  modalTitle = 'Criar Nova Tarefa';
  modalButtonText = 'Salvar';
  filters: any = { isCompleted: '' };
  categories = ['home', 'work', 'personal', 'shopping'];
  priorities = ['low', 'normal', 'high', 'critical'];
  categoryIcons: { [key: string]: string } = {
    home: 'fas fa-home',
    work: 'fas fa-laptop-code',
    personal: 'fas fa-users',
    shopping: 'fas fa-shopping-bag'
  };
  private taskModalElement: Modal | undefined;

  constructor(
    private taskService: TaskService,
    private datePipe: DatePipe // Injeta o DatePipe
  ) { }

  ngOnInit(): void {
    const modalElement = document.getElementById('createTaskModal');
    if (modalElement) {
      this.taskModalElement = new Modal(modalElement);
    }
    this.loadTasks();
  }

  // --- MÉTODOS DE LÓGICA ---

  loadTasks(): void {
    this.taskService.getTasks(this.filters).subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.groupTasksByCategory();
      },
      error: (err: any) => console.error('Erro ao carregar tarefas:', err)
    });
  }

  groupTasksByCategory(): void {
    Object.keys(this.groupedTasks).forEach(key => this.groupedTasks[key] = []);
    this.tasks.forEach(task => {
      if (this.groupedTasks[task.category]) {
        this.groupedTasks[task.category].push(task);
      }
    });
  }

  clearFilters(): void {
    this.filters = { isCompleted: '' };
    this.loadTasks();
  }
  
  // --- MÉTODOS DE INTERAÇÃO COM O MODAL ---

  openCreateModal(): void {
    this.modalTitle = 'Criar Nova Tarefa';
    this.modalButtonText = 'Salvar';
    this.taskInModal = {};
    this.taskModalElement?.show();
  }

  openEditModal(task: Task): void {
    this.modalTitle = 'Editar Tarefa';
    this.modalButtonText = 'Atualizar';
    this.taskInModal = { ...task }; // Copia para evitar two-way binding indesejado
    
    // Formata a data corretamente para o input type="date"
    if (this.taskInModal.dueDate) {
        this.taskInModal.dueDate = this.datePipe.transform(this.taskInModal.dueDate, 'yyyy-MM-dd') || undefined;
    }
    
    this.taskModalElement?.show();
  }
  
  submitTaskForm(): void {
    const payload = { ...this.taskInModal };
    if (payload.id) {
      this.taskService.updateTask(payload.id, payload).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Erro ao atualizar tarefa', err)
      });
    } else {
      this.taskService.createTask(payload).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Erro ao criar tarefa', err)
      });
    }
    this.taskModalElement?.hide();
  }

  deleteTask(): void {
    if (!this.taskInModal.id) return;
    if (confirm("Tem certeza que deseja apagar esta tarefa?")) {
      this.taskService.deleteTask(this.taskInModal.id).subscribe({
        next: () => {
            this.loadTasks();
            this.taskModalElement?.hide();
        },
        error: (err) => console.error('Erro ao apagar tarefa', err)
      });
    }
  }

  // --- MÉTODOS AUXILIARES ---

  toggleComplete(task: Task): void {
    // Inverte o status e envia para a API
    const updatedStatus = !task.isCompleted;
    this.taskService.updateTask(task.id, { isCompleted: updatedStatus }).subscribe({
      next: () => {
        // Apenas atualiza o objeto local no sucesso
        task.isCompleted = updatedStatus;
      },
      error: (err) => {
        console.error('Erro ao atualizar status', err);
      }
    });
  }

  // Função robusta para gerar a string de classes do card
  getCardClasses(task: Task): string {
    let classes = 'task-card card mb-3 task-card-clickable';
    if (task.isCompleted) {
      classes += ' completed';
    }
    if (task.priority) {
      classes += ` task-card-${task.priority}`;
    }
    return classes;
  }
}