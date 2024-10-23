'use client';
import React from "react";
import { observer } from "mobx-react-lite";
import Gauche from "./component/Gauche";
import Centre from "./component/Centre";
import { createContext, useContext } from 'react';
import store from "@/stores/AppStore";

const StoreContext = createContext(store);
const useStore = () => useContext(StoreContext);

const Home: React.FC = observer(() => {
  const { taskList, tasks } = useStore();
  const [loading, setLoading] = React.useState(true);
  const [loadingTasks, setLoadingTasks] = React.useState(true);

  // Récupérer les taskLists
  React.useEffect(() => {
    console.log("passe")
    const fetchTaskLists = async () => {
      try {
        await taskList.fetchTaskLists();
      } catch (error) {
        console.error('Erreur de chargement des taskList:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskLists();
  }, [taskList.taskLists.filter((taskList)=> taskList.affiche).length]);

  // Récupérer les tasks
  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        await tasks.fetchTasks();
      } catch (error) {
        console.error('Erreur de chargement des tasks:', error);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [tasks.tasks]);

  let renderedTaskLists = loading ? <div>Chargement en cours...</div> : null;
  let renderedCenterLists = loadingTasks ? <div>Chargement en cours...</div> : null;

  if (!loading && !loadingTasks) {
    if (taskList.taskLists.length === 0) {
      renderedTaskLists = <div>Aucune tâche disponible</div>;
    } else {
      renderedTaskLists = (
        <Gauche 
          taskList={taskList.taskLists} 
          functionStore={taskList.updateTaskList} 
          addList={taskList.createTaskList} 
        />
      );
    }

    if (tasks.tasks.length === 0) {
      renderedCenterLists = <div>Aucune tâche disponible</div>;
    } else {
      renderedCenterLists = (
        <Centre 
          listTask={taskList.taskLists} 
          functionModifTaskList={taskList.updateTaskList} 
          tasks={tasks.tasks} 
          functionModifTask={tasks.updateTasks} 
          functionAddTask={tasks.createTasks} 
          functionDisableTask={tasks.disableTasks} 
        />
      );
    }
  }

  return (
    <main className="flex min-h-screen h-full flex-row gap-2 justify-between p-24">
      <div className="z-10 w-[25%] h-full max-w-5xl justify-between font-mono text-sm lg:flex">
        {renderedTaskLists}
      </div>
      <div className="relative z-[-1] flex w-[50%] h-full">
        {renderedCenterLists}
      </div>
      <div className="mb-32 grid text-center bg-slate-700 lg:mb-0 lg:w-[25%] h-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        component droit
      </div>
    </main>
  );
});

export default Home;