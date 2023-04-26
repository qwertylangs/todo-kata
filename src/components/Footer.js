import PropTypes from "prop-types"
import nextId from "react-id-generator"

import TaskFilter from "./TasksFilter"

function Footer({ activeTasksCount, activeFilter, onChangeFilter, onClearComplited }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount} items left</span>
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
  activeTasksCount: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearComplited: PropTypes.func.isRequired,
}

export default Footer
