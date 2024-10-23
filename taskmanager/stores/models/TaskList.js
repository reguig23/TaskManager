import { types } from 'mobx-state-tree'

const TaskList = types
  .model('TaskList', {
    _id: types.identifier,
    name: types.string,
    icon: types.string, 
    affiche : types.boolean,
    tasks : types.array(types.optional(types.string, ''))
  })
  .views(() => ({}))
  .actions(() => ({}))

export default TaskList
