import PropTypes from "prop-types"
import nextId from "react-id-generator"

import TaskFilter from "./TasksFilter"

function Footer(props) {
  const { activeTasks, activeFilter, onChangeFilter, onClearComplited } = props
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} items left</span>
      <ul className="filters">
        {["All", "Active", "Completed"].map((filterName) => (
          <TaskFilter
            key={nextId()}
            filterName={filterName}
            activeFilter={activeFilter}
            onChangeFilter={() => onChangeFilter(filterName)}
          />
        ))}
      </ul>
      <button type="button" className="clear-completed" onClick={onClearComplited}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  activeTasks: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearComplited: PropTypes.func.isRequired,
}

export default Footer
