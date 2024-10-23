import React from "react";
// Définir l'interface pour les props

interface GroupTaskProps {
  group: any;
  afficheTask: Function;
}
const GroupTask: React.FC<GroupTaskProps> = ({ group, afficheTask }) => {
  const changeAffiche = (index: string) => {
    const data = {
      _id: group._id,
      name: group.name,
      icon: group.icon,
      affiche: !group.affiche,
      tasks: group.tasks,
    };
    afficheTask(index, data)
      .then(() => {
        console.log("change");
      })
      .catch((error: any) => {
        console.error("Failed to fetch taskList", error);
      });
  };
  return (
    <li
      onClick={() => {
        console.log(group.affiche);
        changeAffiche(group._id);
      }}
      className="w-full border-b border-black rounded-t-lg dark:border-gray-600 hidden md:block" // hidden on mobile, block on tablet and larger screens
    >
      <div className="flex items-center px-3 py-2 md:px-5 md:py-4 justify-between">
        {/* Icon container */}
        <a
          style={{ borderColor: group.icon }}
          className="border-[2px] border-solid w-7 h-5 md:w-9 md:h-7 rounded-lg"
        ></a>

        {/* Group name */}
        <label
          className="w-full ml-2 md:ml-4 text-lg  md:text-lg font-bold dark:text-gray-300 truncate"
          style={{ color: group.icon }}
        >
          {group.name} {group.affiche ? "oui" : "non"}
        </label>

        {/* Task count */}
        <span
          className="ml-2 md:ml-4 p-2 md:p-3 font-bold text-base md:text-lg"
          style={{ color: group.icon }}
        >
          {group.tasks.length}
        </span>
      </div>
    </li>
  );
};

export default GroupTask;
