import { Component } from "react"
import nextId from "react-id-generator"

import NewTaskForm from "./NewTaskForm"
import TaskList from "./TastList"
import Footer from "./Footer"

class App extends Component {
  static filterTasks(tasks, activeFilter) {
    if (activeFilter === "All") return tasks
    if (activeFilter === "Active") {
      return tasks.filter(({ completed }) => !completed)
    }
    if (activeFilter === "Completed") {
      return tasks.filter(({ completed }) => completed)
    }
    throw new Error("not right filter")
  }

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

  onNewTask = (descr) => {
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks,
        {
          descr,
          id: nextId(),
          completed: false,
          editing: false,
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

    const filteredTasks = App.filterTasks(tasks, activeFilter)

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

export default App
