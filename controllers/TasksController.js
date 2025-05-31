import Task from '../models/Task.js';

function TaskController() {
  // Listar todas as tarefas
  async function list(req, res, next) {
    try {
      const tasks = await Task.findAll({ raw: true });
      res.render('tasks/list', { title: 'Lista de Tarefas', tasks });
    } catch (err) {
      next(err);
    }
  }

  // Exibir o formulário de criação de tarefa
  function create(req, res) {
    res.render('tasks/create', { title: 'Criar Tarefa' });
  }

  // Salvar uma nova tarefa
  async function save(req, res, next) {
    try {
      const { name, description, dueDate } = req.body;
      if (!name || !description) {
        return res.render('tasks/create', {
          title: 'Criar Tarefa',
          error: { message: 'Nome e descrição são obrigatórios.' },
        });
      }

      const task = { name, description, dueDate };
      await Task.create(task);
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  }

  // Exibir o formulário de edição de tarefa
  async function edit(req, res, next) {
    try {
      const task = await Task.findOne({ where: { id: req.params.id }, raw: true });
      if (!task) {
        return res.render('404', { title: 'Tarefa Não Encontrada' });
      }
      res.render('tasks/edit', { title: 'Editar Tarefa', task });
    } catch (err) {
      next(err);
    }
  }

  // Atualizar uma tarefa existente
  async function update(req, res, next) {
    try {
      const { name, description, dueDate } = req.body;
      if (!name || !description) {
        return res.render('tasks/edit', {
          title: 'Editar Tarefa',
          error: { message: 'Nome e descrição são obrigatórios.' },
          task: req.body,
        });
      }

      const task = { name, description, dueDate };
      await Task.update(task, { where: { id: req.body.id } });
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  }

  // Remover uma tarefa
  async function remove(req, res, next) {
    try {
      await Task.destroy({ where: { id: req.params.id } });
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  }

  // Atualizar o status de uma tarefa
  async function updateStatus(req, res, next) {
    try {
      const task = await Task.findOne({ where: { id: req.params.id } });
      if (!task) {
        return res.render('404', { title: 'Tarefa Não Encontrada' });
      }

      const updatedStatus = task.completed ? false : true;
      await Task.update({ completed: updatedStatus }, { where: { id: req.params.id } });
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  }

  return {
    list,
    create,
    save,
    edit,
    update,
    remove,
    updateStatus,
  };
}

export default TaskController();
