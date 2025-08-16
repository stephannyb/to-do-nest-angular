'use strict';

// Registra um novo serviço chamado 'TaskService' no nosso módulo principal 'todoApp'.
// A função factory recebe '$http' como uma dependência, que é o serviço do AngularJS para fazer requisições web.
angular.module('todoApp').factory('TaskService', ['$http', function($http) {
    
    // Objeto que iremos retornar com todos os métodos do nosso serviço.
    var service = {};

    // URL base da nossa API. É uma boa prática defini-la em um único lugar.
    var API_URL = 'http://localhost:3000/tasks';

    // --- MÉTODOS DO SERVIÇO ---

    // Método para buscar (GET) tarefas, com opção de filtros.
    service.getTasks = function(filters) {
        // $http.get retorna uma "promessa" (Promise).
        // O objeto { params: filters } transforma { priority: 'high' } em ?priority=high na URL.
        return $http.get(API_URL, { params: filters });
    };

    // Método para buscar uma única tarefa pelo ID.
    service.getTaskById = function(taskId) {
        return $http.get(API_URL + '/' + taskId);
    };

    // Método para criar (POST) uma nova tarefa.
    service.createTask = function(taskData) {
        // O segundo argumento do $http.post é o "body" da requisição.
        return $http.post(API_URL, taskData);
    };

    // Método para atualizar (PATCH) uma tarefa existente.
    service.updateTask = function(taskId, taskData) {
        return $http.patch(API_URL + '/' + taskId, taskData);
    };

    // Método para deletar (DELETE) uma tarefa.
    service.deleteTask = function(taskId) {
        return $http.delete(API_URL + '/' + taskId);
    };

    // Retorna o objeto 'service' com todos os métodos definidos acima,
    // tornando-os disponíveis para quem injetar o 'TaskService'.
    return service;
}]);