import classNames from "classnames"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"

function Task(props) {
  const {
    task: { descr, completed, editing, creationDate, id, time },
    onEditTask,
    onToggleTask,
    onDeleteTask,
  } = props

  const [remaining, setRemaining] = useState(time)
  const [pause, setPause] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(timer)
        return
      }
      if (pause) {
        return
      }
      setRemaining((prev) => (prev <= 0 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [pause])

  const getTime = () => {
    const min = Math.floor(remaining / 60) > 9 ? Math.floor(remaining / 60) : `0${Math.floor(remaining / 60)}`
    const sec = remaining % 60 > 9 ? remaining % 60 : `0${remaining % 60}`
    return `${min}:${sec}`
  }

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
          <span className="title">{descr}</span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={() => setPause(false)}></button>
            <button className="icon icon-pause" type="button" onClick={() => setPause(true)}></button>
            &nbsp; {getTime()}
          </span>
          <span className="description">{passedTime}</span>
        </label>
        <button aria-label="edit" type="button" className="icon icon-edit" onClick={handleEditing} />
        <button aria-label="destroy" type="button" className="icon icon-destroy" onClick={onDeleteTask} />
      </div>
      <input type="text" className="edit" defaultValue={descr} onKeyDown={handleEdit} />
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    descr: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    creationDate: PropTypes.number,
    min: PropTypes.string,
    sec: PropTypes.string,
  }).isRequired,

  onEditTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default Task
