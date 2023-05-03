import { useState } from "react"
import nextId from "react-id-generator"

import NewTaskForm from "./components/NewTaskForm"
import TaskList from "./components/TastList"
import Footer from "./components/Footer"

function App() {
  const [activeFilter, setActiveFilter] = useState("All")

  const [tasks, setTasks] = useState([])

  const onNewTask = ({ task, time }) => {
    setTasks(
      tasks.concat({
        descr: task,
        id: nextId(),
        completed: false,
        editing: false,
        time,
        creationDate: Date.now(),
      })
    )
  }

  const onToggleTask = (id, toggler) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) return { ...task, [toggler]: !task[toggler] }
        return { ...task }
      })
    )
  }

  const onEditTask = (id, descr) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) return { ...task, editing: false, descr }
        return task
      })
    )
  }

  const onDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const onClearComplited = () => {
    setTasks(tasks.filter(({ completed }) => !completed))
  }

  const onChangeFilter = (filterName) => {
    setActiveFilter(filterName)
  }

  const filterTasks = () => {
    const sortedTasks = tasks.sort((prev, curr) => curr.creationDate - prev.creationDate)

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

  const filteredTasks = filterTasks()
  const activeTasksCount = tasks.filter(({ completed }) => !completed).length

  return (
    <section className="todoapp">
      <NewTaskForm onNewTask={onNewTask} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onEditTask={onEditTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
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
