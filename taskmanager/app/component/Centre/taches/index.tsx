import React from "react";

interface TaskView {
    tacheInfo: {
        _id: string;
        name: string;
        description: string;
        complete: boolean;
    };
    upgradeTask: Function;
    removeTask: Function;
}

const TaskVue: React.FC<TaskView> = ({ tacheInfo, upgradeTask, removeTask }) => {
    // Fonction pour gérer la mise à jour de la tâche
    const completeTask = async () => {
        try {
            console.log("passe completeTask");
            const data = { complete: !tacheInfo.complete };
            await upgradeTask(tacheInfo._id, data);
            console.log("complete modifier");
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    // Fonction pour gérer la suppression de la tâche
    const handleRemove = () => {
        try {
            removeTask(tacheInfo._id);
            console.log("Task removed");
        } catch (error) {
            console.error("Error removing task", error);
        }
    };

    return (
        <tr key={tacheInfo._id}>
            <td>
                <input
                    name={tacheInfo._id + "complete"}
                    type="checkbox"
                    checked={tacheInfo.complete}
                    onChange={completeTask}
                />
            </td>
            <td>{tacheInfo.name}</td>
            <td>{tacheInfo.description}</td>
            <td>
                <span onClick={handleRemove}>Edit</span>
            </td>
        </tr>
    );
};

export default TaskVue;
