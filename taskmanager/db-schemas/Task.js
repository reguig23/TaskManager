import mongoose from 'mongoose'


const TaskSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false
  },
  description: {
    type: String,
    default: true,
  },
})

const Task= mongoose.models.Task|| mongoose.model('Task', TaskSchemas);
export default Task;

