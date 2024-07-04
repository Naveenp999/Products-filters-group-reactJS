import {BsFilterRight} from 'react-icons/bs'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {searchClick, listLength} = props

  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const searchChange = event => searchClick(event)

  const {sortbyOptions, activeOptionId} = props

  return (
    <div className="products-header">
      <div className="search-container">
        <input
          className="search-input"
          onKeyDown={searchChange}
          type="search"
          placeholder="search"
        />
        <BsSearch className="search-icon" />
      </div>
      {listLength > 0 && (
        <div className="product-sub-header">
          <h1 className="products-list-heading">All Products</h1>
          <div className="sort-by-container">
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
            <select
              className="sort-by-select"
              value={activeOptionId}
              onChange={onChangeSortby}
            >
              {sortbyOptions.map(eachOption => (
                <option
                  key={eachOption.optionId}
                  value={eachOption.optionId}
                  className="select-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsHeader
