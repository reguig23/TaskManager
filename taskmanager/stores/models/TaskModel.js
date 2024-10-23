import { types } from 'mobx-state-tree'

const Tasks = types
  .model('Tasks', {
    _id: types.identifier,
    name: types.string,
    complete : types.boolean,
    description : types.string
  })
  .views(() => ({}))
  .actions(() => ({}))

export default Tasks