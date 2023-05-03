import { useState } from "react"
import PropTypes from "prop-types"

function NewTaskForm({ onNewTask }) {
  const [form, setForm] = useState({ task: "", min: "", sec: "" })

  const handleSubmit = (e) => {
    if (e.key !== "Enter") return

    const { task, min, sec } = form
    const time = min * 60 + +sec
    if (!task.trim() || !time || time > 86400) return

    onNewTask({ task, time })
    setForm({ task: "", min: "", sec: "" })
  }

  const onInput = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <div className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          name="task"
          onChange={onInput}
          onKeyDown={handleSubmit}
          value={form.task}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="min"
          type="number"
          onChange={onInput}
          onKeyDown={handleSubmit}
          value={form.min}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="sec"
          type="number"
          onChange={onInput}
          onKeyDown={handleSubmit}
          value={form.sec}
        ></input>
        <button type="submit"></button>
      </div>
    </header>
  )
}

NewTaskForm.propTypes = {
  onNewTask: PropTypes.func.isRequired,
}

export default NewTaskForm
