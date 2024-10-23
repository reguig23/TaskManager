import React from "react";
import GroupTask from "./list";
import { PlusIcon } from "@heroicons/react/16/solid";
import ColorPicker from "react-pick-color";

// Définir l'interface pour les props
interface GaucheProps {
  taskList: Object[];
  functionStore: Function;
  addList: Function;
}
const Gauche: React.FC<GaucheProps> = ({
  taskList,
  functionStore,
  addList,
}) => {
  const [block, setBlock] = React.useState(false);
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");
  const renderedTaskLists =
    taskList.length > 0
      ? taskList.map((grp, index) => (
          <GroupTask key={index} group={grp} afficheTask={functionStore} />
        ))
      : "Pas de liste";
        
  const ajoutList = () => {
    const data = {
      name: name,
      icon: color,
      affiche: false,
      tasks: [],
    };
    addList(data)
      .then(() => {
        setBlock(false);
      })
      .catch((error: any) => {
        console.error("Failed to fetch taskList", error);
      });
  };
  return (
    <div className="w-full flex flex-col h-full bg-slate-400">
      {/* Header */}
      <div className="w-full h-[5%] flex items-center justify-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Groupe</h3>
      </div>

      {/* Task list */}
      <div className="w-full h-[90%] flex flex-col overflow-auto">
        <ul>{renderedTaskLists}</ul>
      </div>

      {/* Create new list button */}
      <div className="w-full h-[5%] flex ">
        <button
          className="text-black flex flex-row gap-2 sm:gap-3 md:gap-5 items-center"
          onClick={() => setBlock(!block)}
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          <p className="text-sm sm:text-base md:text-lg font-bold">
            Create a new list
          </p>
        </button>
      </div>

      {/* Modal */}
      <div
        id="authentication-modal"
        style={{ visibility: block ? "visible" : "hidden" }}
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-400/55"
      >
        <div className="relative p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 lg:p-6 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Ajouter une nouvelle liste
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => setBlock(false)}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            <form className="space-y-3 sm:space-y-4 md:space-y-5" action="#">
              {/* Titre input */}
              <div>
                <label
                  htmlFor="titre"
                  className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                >
                  Titre
                </label>
                <input
                  type="text"
                  name="titre"
                  id="titre"
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5 md:p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Titre"
                  value={name}
                  required
                />
              </div>

              {/* Color input */}
              <div>
                <label
                  htmlFor="color"
                  className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                >
                  Choose a color
                </label>
                <ColorPicker
                  color={color}
                  onChange={(color) => setColor(color.hex)}
                />
              </div>

              {/* Submit button */}
              <button
                type="button"
                onClick={ajoutList}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-base md:text-lg px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gauche;
