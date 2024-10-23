import { types } from 'mobx-state-tree';
import ThemeStore from '@/stores/ThemeStore';
import TaskListStore from '@/stores/TaskListStore';
import TaskStore from '@/stores/TaskStore';
import Tasks from './models/TaskModel';
import TaskList from './models/TaskList';
// Interface pour le store principal

export interface AppStore {
  taskList: {
    fetchTaskLists: () => Promise<void>;
    taskLists: typeof TaskList[];
    updateTaskList: (id: string, data: Partial<typeof TaskList>) => Promise<void>;
    createTaskList: (data: typeof TaskList) => Promise<void>;
  };
  tasks: {
    fetchTasks: () => Promise<void>;
    tasks: typeof Tasks[];
    updateTasks: (id: string, data: Partial< typeof Tasks>) => Promise<void>;
    createTasks: (data:  typeof Tasks) => Promise<void>;
    disableTasks: (id: string) => Promise<void>;
  };
  theme: {
    // Ajoutez les propriétés de ThemeStore ici si nécessaire
  };
}

// Définition du modèle du store principal
const AppStoreModel = types.model('AppStore', {
  taskList: types.optional(TaskListStore, {}),
  tasks: types.optional(TaskStore, {}),
  theme: types.optional(ThemeStore, {}),
});

// Initialiser le store avec des données par défaut
const initialStore = {
  taskList: TaskListStore.create(), // Correction
  tasks: TaskStore.create(), // Correction
  theme: ThemeStore.create(), // Correction
};

// Fonction pour créer le store
export const createStore = (data = {}) => AppStoreModel.create({ ...initialStore, ...data });

// Créez une instance du store
const store = createStore();
export default store;
