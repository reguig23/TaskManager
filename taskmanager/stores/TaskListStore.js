import { types, flow } from 'mobx-state-tree'
import TaskList from './models/TaskList';

const TaskListStore = types
  .model('TaskListStore', {
    taskLists: types.array(TaskList), // Initialize taskListsPanel as an array of TaskList model
  })
  .views(() => ({
  }))
  .actions((self) => ({
    fetchTaskLists: flow(function* fetchTaskLists() {
      // get TaskLists
      try {
        const response = yield fetch("/api/taskList-data");
        const jsonTaskList = yield response.json();
        const data = jsonTaskList.data;
        const adjustedData = data.map(TaskList => ({
          _id: TaskList._id,
          name: TaskList.name,
          icon: TaskList.icon,
          tasks : TaskList.tasks,
          affiche : TaskList.affiche
        }));
        self.taskLists.replace(adjustedData.map(taskList =>  TaskList.create(taskList)));

      } catch (error) {
        console.error("Failed to fetch taskLists", error);
      }
    }),
    createTaskList: flow(function* createTaskList(taskList) {

      try {
        const response = yield fetch("/api/taskList-data", {
          method: "POST",
          body: JSON.stringify(taskList),
          headers: { "Content-Type": "application/json" },
        });

        if(response.status ===201){
          const newTaskList = yield response.json();
          
          self.taskLists.push(TaskList.create(newTaskList.data));
           return({status : response.status ,data : newTaskList.data});
        }
        else if(response.status ===400){
          const newTaskList = yield response.json();
          return({status : response.status ,errors : newTaskList.errors});
        }
        
        
      } catch (error) {
        console.error("Failed to create TaskList", error);
      }
    }),
    updateTaskList: flow(function* updateTaskList(id,data) {
      try {
        const response = yield fetch(`/api/taskList-data`, {
          method: "PUT",
          body: JSON.stringify({ id: id, data: data }),
          headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
          const updatedTaskList = yield response.json();
          const index = self.taskLists.findIndex(taskList => taskList._id === id);
    
          if (index !== -1) {
            console.log(self.taskLists[index].affiche)
           self.taskLists[index] = TaskList.create( updatedTaskList.data)
           console.log(self.taskLists[index].affiche)
          }
        } else {
          console.error('Erreur lors de la mise à jour', response.status);
        }
      } catch (error) {
        console.error("Échec de la mise à jour de la TaskList", error);
      }
    }),
    disableTaskList: flow(function* disableTaskList(TaskList) {
      
      try {
        const response = yield fetch(`/api/taskList-data`, {
          method: "DELETE",
          body: JSON.stringify(TaskList),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Delete TaskList
        self.taskLists = self.taskLists.filter(att => att._id !== TaskList);
      } catch (error) {
        console.error("Failed to delete TaskList", error);
      }
    })
  }))

export default TaskListStore
