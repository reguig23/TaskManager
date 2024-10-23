import React, { useEffect } from "react";
import TaskVue from "./taches";

interface CentreProps {
  listTask: any[];
  functionModifTaskList: Function;
  tasks: any[];
  functionModifTask: Function;
  functionAddTask: Function;
  functionDisableTask: Function;
}

const Centre: React.FC<CentreProps> = ({
  listTask,
  functionModifTaskList,
  tasks,
  functionModifTask,
  functionAddTask,
  functionDisableTask
}) => {
  const [date, setDate] = React.useState(new Date());
  const [taches, setTaches] = React.useState<any[]>([]);

  useEffect(() => {
    console.log("passe le useEffect")
    const fetchAndProcessTasks = async () => {
      try {
        console.log(listTask);
        console.log(tasks.length)
        const affList = listTask.filter((liste) => {return liste.affiche});
        console.log(affList)
        const allTaskAfficherId = affList.reduce(
          (acc: string[], liste) => acc.concat(liste.tasks),
          []
        );
        console.log(allTaskAfficherId);
        console.log(tasks[0])
        const afficheTaches = tasks.filter((task: any) =>
          allTaskAfficherId.includes(task._id)
        );
        console.log(afficheTaches);
        setTaches(afficheTaches);
      } catch (error) {
        console.error("Error processing tasks", error);
      }
    };

    fetchAndProcessTasks();
  }, [listTask.filter((listT)=>listT.affiche).length,tasks]);
  const rendertacheList = taches.length > 0 ? (
    taches.map((task: any) => (
      <TaskVue
        key={task._id}
        tacheInfo={task}
        upgradeTask={functionModifTask}
        removeTask={functionDisableTask}
      />
    ))
  ) : (
    <tr>
      <td colSpan={4}>No tasks available</td>
    </tr>
  );
  return (
    <div className="w-full flex flex-col h-full gap-2">
      {/* Header */}
      <div className="w-full h-[5%] flex flex-col">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Bonjour, voici vos taches à faire
        </h3>
        <h5>
          Today, {date.toLocaleDateString("fr-FR", { weekday: "long" })}{" "}
          {date.getDate()} {date.toLocaleDateString("fr-FR", { month: "long" })}{" "}
          {date.getFullYear()}
        </h5>
      </div>
      {/* Body */}
      <div className="w-full h-[90%] bg-orange-200 justify-center">
        <table className="w-full tw-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="w-[5%]"></th>
              <th className="w-[45%]" onClick={() => console.log("test")}>
                Name
              </th>
              <th className="w-[45%]">Description</th>
              <th className="w-[5%]">Edit</th>
            </tr>
          </thead>
          <tbody>
            {rendertacheList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Centre;
