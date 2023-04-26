import { useState, useReducer } from "react"
import nextId from "react-id-generator"

import NewTaskForm from "./NewTaskForm"
import TaskList from "./TastList"
import Footer from "./Footer"

function reducerTasks(state, { type, payload }) {
  switch (type) {
    case "addTask": {
      return [...state, payload]
    }

    case "editTask": {
      return state.map((task) => {
        if (payload.id === task.id) return { ...task, editing: false, descr: payload.descr }
        return task
      })
    }

    case "toggleTask": {
      return state.map((task) => {
        if (payload.id === task.id) return { ...task, [payload.toggler]: !task[payload.toggler] }
        return { ...task }
      })
    }

    case "deleteTask": {
      return state.filter((task) => task.id !== payload.id)
    }

    case "clearComplited": {
      return state.filter(({ completed }) => !completed)
    }

    default:
      throw new Error("not right action")
  }
}

function App() {
  const [stateTasks, dispatchTasks] = useReducer(reducerTasks, [])
  const [activeFilter, setActiveFilter] = useState("All")

  const onNewTask = ({ task, time }) => {
    dispatchTasks({
      type: "addTask",
      payload: {
        descr: task,
        id: nextId(),
        completed: false,
        editing: false,
        time,
        creationDate: Date.now(),
      },
    })
  }

  const onEditTask = (id, descr) => {
    dispatchTasks({ type: "editTask", payload: { id, descr } })
  }
  const onToggleTask = (id, toggler) => {
    dispatchTasks({ type: "toggleTask", payload: { id, toggler } })
  }
  const onDeleteTask = (id) => {
    dispatchTasks({ type: "deleteTask", payload: { id } })
  }
  const onClearComplited = () => {
    dispatchTasks({ type: "clearComplited" })
  }

  const onChangeFilter = (filterName) => {
    setActiveFilter(filterName)
  }

  const filterTasks = () => {
    const sortedTasks = stateTasks.sort((prev, curr) => curr.creationDate - prev.creationDate)

    switch (activeFilter) {
      case "All":
        return sortedTasks
      case "Active":
        return sortedTasks.filter(({ completed }) => !completed)
      case "Completed":
        return sortedTasks.filter(({ completed }) => completed)
      default:
        throw new Error("not right filter")
    }
  }

  const tasks = filterTasks()
  const activeTasksCount = tasks.filter(({ completed }) => !completed).length

  return (
    <section className="todoapp">
      <NewTaskForm onNewTask={onNewTask} />
      <section className="main">
        <TaskList tasks={tasks} onEditTask={onEditTask} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
        <Footer
          activeTasksCount={activeTasksCount}
          activeFilter={activeFilter}
          onChangeFilter={onChangeFilter}
          onClearComplited={onClearComplited}
        />
      </section>
    </section>
  )
}

export default App
