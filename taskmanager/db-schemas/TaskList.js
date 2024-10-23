import mongoose from 'mongoose'
import { type } from 'os';


const TaskListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this attorney.'],
    unique : true
  },
  icon:{
    type: String,
    require : true,
    unique : true
  },
  affiche:{
    type : Boolean,
    require : true,
    default : false,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',  // Référence au modèle Task
  }],
  
})
const TaskList = mongoose.models.TaskList || mongoose.model('TaskList', TaskListSchema);
export default TaskList;