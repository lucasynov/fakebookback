'use strict';

module.exports = function(app) {
  
  let userController = require('../controllers/userController');
  let todoList = require('../controllers/todoListController');

  // todoList Users
  app.route('/user')
    .post(userController.signup);
  
  app.route('/login')
    .post(userController.login);

  app.route('/user/get')
    .post(userController.findUser);

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
  
  
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

};