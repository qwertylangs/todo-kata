import React from "react"
import PropTypes from "prop-types"

function reducer(state, action) {
  switch (action.type) {
    case "task":
      return { ...state, [action.type]: action.payload }
    case "min":
      return { ...state, [action.type]: action.payload }
    case "sec":
      return { ...state, [action.type]: action.payload }
    default:
      return state
  }
}

function NewTaskForm({ onNewTask }) {
  const [state, dispatch] = React.useReducer(reducer, {
    task: "",
    min: "",
    sec: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const { task, min, sec } = state
    const time = min * 60 + +sec
    if (!state.task.trim() || !time) return

    onNewTask({ task, time })
    dispatch({ type: "task", payload: "" })
    dispatch({ type: "min", payload: "" })
    dispatch({ type: "sec", payload: "" })
  }

  const onInput = (e) => {
    const { name, value } = e.target
    dispatch({ type: name, payload: value })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" name="newTodo" onSubmit={handleSubmit}>
        <input className="new-todo" placeholder="Task" name="task" onChange={onInput} value={state.task}></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="min"
          type="number"
          onChange={onInput}
          value={state.min}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="sec"
          type="number"
          onChange={onInput}
          value={state.sec}
        ></input>
        <button type="submit"></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onNewTask: PropTypes.func.isRequired,
}

export default NewTaskForm
