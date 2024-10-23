import { types, flow, applySnapshot } from 'mobx-state-tree';
import Tasks from '@/stores/models/TaskModel';

const TaskStore = types
  .model('TasksStore', {
    tasks: types.array(Tasks),
  })
  .actions((self) => ({
    fetchTasks: flow(function* fetchTasks() {
      try {
        const response = yield fetch('/api/task-data');
        const jsonTasks = yield response.json();
        const data = jsonTasks.data;

        // Mettre à jour les tâches existantes avec les nouvelles données
        const adjustedData = data.map(task => ({
          _id: task._id,
          name: task.name,
          complete: task.complete,
          description: task.description,
        }));

        // Utilisez `applySnapshot` pour remplacer les tâches tout en respectant l'arbre MobX
        applySnapshot(self.tasks, adjustedData);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    }),

    createTasks: flow(function* createTask(task) {
      try {
        const response = yield fetch('/api/task-data', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const newTask = yield response.json();
          self.tasks.push(newTask.data);  // Pas besoin de recréer l'objet MST ici
          return { status: response.status, data: newTask.data };
        } else {
          const errorData = yield response.json();
          return { status: response.status, errors: errorData.errors };
        }
      } catch (error) {
        console.error('Failed to create task', error);
      }
    }),

    updateTasks: flow(function* updateTasks(id, data) {
      try {
        const response = yield fetch(`/api/task-data`, {
          method: 'PUT',
          body: JSON.stringify({ id, data }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const updatedTask = yield response.json();
          const task = self.tasks.find(task => task._id === id);

          if (task) {
            // Mettre à jour les propriétés de l'objet existant
            applySnapshot(task, updatedTask.data);
          }
        }
      } catch (error) {
        console.error('Failed to update task', error);
      }
    }),

    disableTasks: flow(function* disableTasks(taskId) {
      try {
        const response = yield fetch('/api/task-data', {
          method: 'DELETE',
          body: JSON.stringify({ _id: taskId }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // Supprimer la tâche de la liste
          self.tasks = self.tasks.filter(task => task._id !== taskId);
          return taskId;
        } else {
          throw new Error('Failed to delete task');
        }
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }),
  }));

export default TaskStore;
