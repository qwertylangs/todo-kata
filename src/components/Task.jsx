import classNames from "classnames"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import PropTypes from "prop-types"
import { useState } from "react"

import useInterval from "../utils/useInterval"

export function Task({
  task: { descr, completed, editing, creationDate, id, time },
  onEditTask,
  onToggleTask,
  onDeleteTask,
}) {
  const [remaining, setRemaining] = useState(time)
  const [pause, setPause] = useState(true)

  useInterval(
    () => {
      setRemaining((prev) => (prev <= 0 ? 0 : prev - 1))
    },
    remaining <= 0 || pause ? null : 1000
  )

  const getTime = () => {
    let remainingTime = remaining
    const hours =
      Math.floor(remainingTime / 3600) > 9 ? Math.floor(remainingTime / 3600) : `0${Math.floor(remainingTime / 3600)}`

    remainingTime %= 3600
    const min =
      Math.floor(remainingTime / 60) > 9 ? Math.floor(remainingTime / 60) : `0${Math.floor(remainingTime / 60)}`

    remainingTime %= 60
    const sec = remainingTime % 60 > 9 ? remainingTime % 60 : `0${remainingTime % 60}`
    return hours === "00" ? `${min}:${sec}` : `${hours}:${min}:${sec}`
  }

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

  const passedTime = formatDistanceToNow(creationDate)
  const liClassNames = classNames({ completed, editing })

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
