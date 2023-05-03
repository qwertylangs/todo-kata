import PropTypes from "prop-types"

import Task from "./Task"

function TaskList(props) {
  const { tasks, onEditTask, onToggleTask, onDeleteTask } = props
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEditTask={(value) => onEditTask(task.id, value)}
          onToggleTask={(prop) => onToggleTask(task.id, prop)}
          onDeleteTask={() => onDeleteTask(task.id)}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  onEditTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default TaskList
