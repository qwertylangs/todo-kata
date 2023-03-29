import classNames from "classnames"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import PropTypes from "prop-types"

function Task(props) {
  const {
    task: { descr, completed, editing, creationDate, id },
    onEditTask,
    onToggleTask,
    onDeleteTask,
  } = props

  const passedTime = formatDistanceToNow(creationDate)

  const liClassNames = classNames({ completed, editing })

  const handleComplete = (e) => {
    if (e.target.tagName === "BUTTON" || editing) return
    onToggleTask("completed")
  }

  const handleEdit = (e) => {
    const { value } = e.currentTarget
    if (!value) return
    if (e.key === "Enter") onEditTask(value)
  }

  const handleEditing = () => {
    if (completed) return
    onToggleTask("editing")
  }

  const editingTask = <input type="text" className="edit" defaultValue={descr} onKeyDown={handleEdit} />

  return (
    <li className={liClassNames}>
      <div className="view">
        <input
          id={`taskInput${id}`}
          className="toggle"
          type="checkbox"
          checked={completed}
          readOnly
          onClick={handleComplete}
        />
        <label htmlFor={`taskInput${id}`}>
          <span className="description">{descr}</span>
          <span className="created">created {passedTime} ago</span>
        </label>
        <button aria-label="edit" type="button" className="icon icon-edit" onClick={handleEditing} />
        <button aria-label="destroy" type="button" className="icon icon-destroy" onClick={onDeleteTask} />
      </div>
      {editing && editingTask}
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    descr: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    creationDate: PropTypes.number,
  }).isRequired,

  onEditTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default Task
