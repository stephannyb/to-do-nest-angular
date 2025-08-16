'use strict';

angular.module('todoApp').component('taskList', {
    // O templateUrl aponta para o arquivo HTML que vamos criar no próximo passo.
    templateUrl: 'components/task-list/taskList.template.html',
    controller: ['TaskService', function TaskListController(TaskService) {
        var self = this;

        // --- Propriedades do Controller ---

        // Array para guardar a lista original de tarefas que vem da API
        self.tasks = [];
    
        self.filters = {
            isCompleted: '' //  '' para 'Todos', 'true' para 'Concluídos', 'false' para 'Não Concluídos'
        };

        // Objeto para guardar as tarefas agrupadas por categoria (para o layout Trello)
        self.groupedTasks = {
            home: [],
            work: [],
            personal: [],
            shopping: []
        };

        self.priorities = ['low', 'normal', 'high', 'critical'];
        
        // Array auxiliar para o ng-repeat criar as colunas na ordem certa
        self.categories = ['home', 'work', 'personal', 'shopping'];

        // Objeto para mapear categorias a ícones (usando Font Awesome)
        self.categoryIcons = {
            home: 'fas fa-home',
            work: 'fas fa-laptop-code',
            personal: 'fas fa-users',
            shopping: 'fas fa-shopping-bag'
        };

        // --- Funções do Controller ---


        self.submitTaskForm = function() {
   
            var payload = angular.copy(self.taskInModal);

            if (payload.dueDate) {
                payload.dueDate = new Date(payload.dueDate).toISOString();
            }

            // A MÁGICA ACONTECE AQUI:
            // Se a tarefa tem um ID, nós ATUALIZAMOS (PATCH).
            if (payload.id) {
                TaskService.updateTask(payload.id, payload)
                    .then(function() {
                        console.log('Tarefa atualizada com sucesso!');
                        self.loadTasks(); // Recarrega a lista para mostrar as mudanças
                    }, function(error) {
                        console.error('Erro ao atualizar tarefa:', error);
                        alert('Não foi possível atualizar a tarefa.');
                    });
            } 
            // Se não tem um ID, nós CRIAMOS (POST).
            else {
                TaskService.createTask(payload)
                    .then(function() {
                        console.log('Tarefa criada com sucesso!');
                        self.loadTasks(); // Recarrega a lista para mostrar a nova tarefa
                    }, function(error) {
                        console.error('Erro ao criar tarefa:', error);
                        alert('Não foi possível criar a tarefa.');
                    });
            }
            
            // Limpamos o formulário após salvar, seja criando ou editando
            self.taskInModal = {};
        };

        // Função principal que carrega as tarefas da API
        self.loadTasks = function() {
            // 1. Cria um objeto de filtros limpo
            var cleanFilters = {};

            // 2. Itera sobre os filtros do formulário
            for (var key in self.filters) {
                // 3. Adiciona ao objeto limpo APENAS se o filtro tiver um valor válido (não for nulo, undefined ou vazio)
                if (self.filters[key] !== null && self.filters[key] !== undefined && self.filters[key] !== '') {
                    cleanFilters[key] = self.filters[key];
                }
            }
        
            // 4. Envia o objeto de filtros limpo para o serviço
            TaskService.getTasks(cleanFilters).then(function(response) {
                self.tasks = response.data;
                self.groupTasksByCategory();
            }, function(error) {
                console.error('Erro ao carregar tarefas:', error);
            });
        };

        self.clearFilters = function() {
            self.filters = { isCompleted: '' };
            self.loadTasks(); // Recarrega a lista sem filtros
        };

        self.openEditModal = function(task) {
            //console.log('Abrindo modal para editar:', task);
            self.modalTitle = 'Editar Tarefa';
            self.modalButtonText = 'Atualizar';
            
            // IMPORTANTE: Usamos angular.copy para não alterar o card na tela enquanto editamos no modal
            self.taskInModal = angular.copy(task);

            // O input type="date" precisa de um objeto Date, não de uma string.
            // Convertemos a string ISO que vem do backend para um objeto Date.
            if (self.taskInModal.dueDate) {
                self.taskInModal.dueDate = new Date(self.taskInModal.dueDate);
            }

            // Abre o modal usando a API de JavaScript do Bootstrap 5
            var taskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
            taskModal.show();
        };

        // (Opcional, mas recomendado) Crie uma função para abrir o modal para CRIAR
        self.openCreateModal = function() {
            self.modalTitle = 'Criar Nova Tarefa';
            self.modalButtonText = 'Salvar'; 
            self.taskInModal = {}; // Garante que o formulário esteja limpo
            var taskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
            taskModal.show();
        };

        // Função que organiza o array 'self.tasks' no objeto 'self.groupedTasks'
        self.groupTasksByCategory = function() {
            // Primeiro, limpa os arrays para não duplicar tarefas ao recarregar
            Object.keys(self.groupedTasks).forEach(key => self.groupedTasks[key] = []);

            // Itera sobre cada tarefa e a coloca no grupo correto
            self.tasks.forEach(function(task) {
                if (self.groupedTasks[task.category]) {
                    self.groupedTasks[task.category].push(task);
                }
            });
        };

        // Função para ser chamada quando o checkbox de uma tarefa é clicado
        self.toggleComplete = function(task) {
            // O ng-model já atualizou o 'task.isCompleted' no objeto.
            // Agora, enviamos o objeto inteiro para a API salvar.
            TaskService.updateTask(task.id, { isCompleted: task.isCompleted })
                .then(function() {
                    console.log('Tarefa atualizada com sucesso!');
                    // Poderíamos adicionar um feedback visual aqui
                }, function(error) {
                    console.error('Erro ao atualizar tarefa:', error);
                    // Em caso de erro, desfazemos a mudança visual
                    task.isCompleted = !task.isCompleted;
                });
        };

        // Função auxiliar para retornar uma classe CSS baseada na prioridade da tarefa
        self.getPriorityClass = function(priority) {
            return 'task-card-' + priority; // ex: 'task-card-high'
        };

        self.deleteTask = function() {
            if (!self.taskInModal.id) return; // Segurança extra

            // Pede confirmação ao usuário
            var isConfirmed = confirm("Tem certeza que deseja apagar esta tarefa? Esta ação não pode ser desfeita.");

            // Se o usuário clicou em "OK" (true)
            if (isConfirmed) {
                console.log('Apagando tarefa ID:', self.taskInModal.id);
                TaskService.deleteTask(self.taskInModal.id)
                    .then(function() {
                        console.log('Tarefa apagada com sucesso!');
                        // Limpa o formulário e recarrega a lista para refletir a exclusão
                        self.taskInModal = {};
                        self.loadTasks();
                    }, function(error) {
                        console.error('Erro ao apagar tarefa:', error);
                        alert('Não foi possível apagar a tarefa.');
                    });
            }
        };

        // --- Inicialização ---

        // Chama a função para carregar os dados assim que o componente é criado.
        self.loadTasks();
    }]
});