import './index.css'
import {BsSearch} from 'react-icons/bs'

const FiltersGroup = props => {
  const {
    itemsFilter,
    ratingFilter,
    categoryClick,
    searchClick,
    starsClick,
    clearFilter,
    activeCategory,
    activeStars,
  } = props

  const searchChange = event => searchClick(event)

  const clearFilters = () => clearFilter()

  return (
    <div className="filters-group-container">
      <div className="search-container-filter horizantal">
        <input
          className="search-input-filter"
          onKeyDown={searchChange}
          type="search"
          placeholder="search"
        />
        <BsSearch className="search-icon-filter" />
      </div>
      <h1 className="filter-heading">Category</h1>
      <ul className="filters-list-container">
        {itemsFilter.map(element => {
          const first = () => categoryClick(element.categoryId)
          const active = activeCategory === element.categoryId ? 'active' : ''
          return (
            <li>
              <button
                className="button filter-text"
                type="button"
                onClick={first}
                value={element.categoryId}
              >
                <p className={`filter-text ${active}`}>{element.name}</p>
              </button>
            </li>
          )
        })}
      </ul>
      <h1 className="filter-heading">Rating</h1>
      <ul className="filters-list-container">
        {ratingFilter.map(element => {
          const second = () => starsClick(element.ratingId)
          const active = element.ratingId === activeStars ? 'active' : ''
          return (
            <li>
              <button
                className="horizantal button"
                type="button"
                value={element.ratingId}
                onClick={second}
              >
                <img
                  src={element.imageUrl}
                  className="stars-icon"
                  alt={`rating ${element.ratingId}`}
                />
                <p className={`filter-text ${active}`}>& up</p>
              </button>
            </li>
          )
        })}
      </ul>
      <button className="clear-btn" type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
