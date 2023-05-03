import classNames from "classnames"
import PropTypes from "prop-types"

function TaskFilter({ activeFilter, filterName, onChangeFilter }) {
  const style = classNames({
    selected: activeFilter === filterName,
  })

  const handleClick = () => {
    if (activeFilter === filterName) return
    onChangeFilter()
  }

  return (
    <li>
      <button type="button" className={style} onClick={handleClick}>
        {filterName}
      </button>
    </li>
  )
}

TaskFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default TaskFilter
