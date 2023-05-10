import { Component } from "react"
import nextId from "react-id-generator"

import { NewTaskForm } from "./components/NewTaskForm"
import { TaskList } from "./components/TastList"
import { Footer } from "./components/Footer"

function filterTasks(tasks, activeFilter) {
  const sortedTasks = tasks.sort((prev, curr) => curr.creationDate - prev.creationDate)

  if (activeFilter === "All") return sortedTasks
  if (activeFilter === "Active") {
    return sortedTasks.filter(({ completed }) => !completed)
  }
  if (activeFilter === "Completed") {
    return sortedTasks.filter(({ completed }) => completed)
  }
  throw new Error("not right filter")
}

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
      activeFilter: "All",
    }
  }

  onEditTask = (id, descr) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (id === task.id) return { ...task, editing: false, descr }
        return task
      }),
    }))
  }

  onToggleTask = (id, prop) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (id === task.id) return { ...task, [prop]: !task[prop] }
        return { ...task }
      }),
    }))
  }

  onDeleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }

  onNewTask = ({ task, time }) => {
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks,
        {
          descr: task,
          id: nextId(),
          completed: false,
          editing: false,
          time,
          creationDate: Date.now(),
        },
      ],
    }))
  }

  onChangeFilter = (filterName) => {
    this.setState({
      activeFilter: filterName,
    })
  }

  onClearComplited = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter(({ completed }) => !completed),
    }))
  }

  render() {
    const { tasks, activeFilter } = this.state

    const activeTasks = tasks.filter(({ completed }) => !completed).length

    const filteredTasks = filterTasks(tasks, activeFilter)

    return (
      <section className="todoapp">
        <NewTaskForm onNewTask={this.onNewTask} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onEditTask={this.onEditTask}
            onToggleTask={this.onToggleTask}
            onDeleteTask={this.onDeleteTask}
          />
          <Footer
            activeTasks={activeTasks}
            activeFilter={activeFilter}
            onChangeFilter={this.onChangeFilter}
            onClearComplited={this.onClearComplited}
          />
        </section>
      </section>
    )
  }
}
