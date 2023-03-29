import { Component } from "react"
import PropTypes from "prop-types"

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
    }
  }

  onInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { value } = e.target
    const { onNewTask } = this.props
    if (e.key === "Enter" && value) {
      onNewTask(value)

      this.setState({
        inputValue: "",
      })
    }
  }

  render() {
    const { inputValue } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={this.onInput}
          onKeyDown={this.onSubmit}
        />
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onNewTask: PropTypes.func.isRequired,
}

export default NewTaskForm
