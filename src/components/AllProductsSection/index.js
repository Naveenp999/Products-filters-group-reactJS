import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const tabList = [
  {success: 'SUCCESS'},
  {failure: 'FAILURE'},
  {loading: 'LOADING'},
  {initial: 'INITIAL'},
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOne: tabList[3].initial,
    activeOptionId: sortbyOptions[0].optionId,
    category: 0,
    stars: 0,
    search: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  categoryChange = item => this.setState({category: item}, this.getProducts)

  starsChange = item => this.setState({stars: item}, this.getProducts)

  searchChange = e => {
    if (e.key === 'Enter') {
      this.setState({search: e.target.value}, this.getProducts)
    }
  }

  getProducts = async () => {
    this.setState({activeOne: tabList[2].loading})

    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, stars, search} = this.state

    const apiUrl =
      category !== 0
        ? `sort_by=${activeOptionId}&category=${category}&title_search=${search}`
        : `sort_by=${activeOptionId}&title_search=${search}`

    const newUrl = stars !== 0 
        ? `${apiUrl}&rating=${stars}` : apiUrl
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/products?${newUrl}}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      console.log(updatedData)
      this.setState({
        productsList: updatedData,
        activeOne: tabList[0].success,
      })
    } else {
      this.setState({activeOne: tabList[1].failure})
    }
  }

  clearAll = () =>
    this.setState({category: 0, stars: 0, search: ''}, this.getProducts)

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  emptyTemplate = () => (
    <div className="failure-icon-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
        className="failure-icon"
      />
      <h1 className="heading">No Products Found</h1>
      <p className="description">We could not find any products. Try other filters.</p>
    </div>
  )

  renderProductsList = () => {
    const {productsList} = this.state

    if (productsList.length === 0) {
      return this.emptyTemplate()
    }
    return (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  selectOne = () => {
    const {activeOne} = this.state
    switch (activeOne) {
      case tabList[0].success:
        return this.renderProductsList()
      case tabList[1].failure:
        return this.renderFailure()
      case tabList[2].loading:
        return this.renderLoader()
      default:
        return <></>
    }
  }

  renderFailure = () => (
    <div className="failure-icon-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-icon"
      />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {activeOptionId, productsList, category, stars} = this.state
    return (
      <div className="all-products-section">
        <div className="header-large">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
            searchClick={this.searchChange}
            listLength={productsList.length}
          />
        </div>
        <div className="filter-product-container">
          <div className="filter-con">
            <FiltersGroup
              itemsFilter={categoryOptions}
              ratingFilter={ratingsList}
              categoryClick={this.categoryChange}
              starsClick={this.starsChange}
              clearFilter={this.clearAll}
              searchClick={this.searchChange}
              activeCategory={category}
              activeStars={stars}
            />
          </div>
          <div className="header-small">
            <ProductsHeader
              activeOptionId={activeOptionId}
              sortbyOptions={sortbyOptions}
              changeSortby={this.changeSortby}
              searchClick={this.searchChange}
              listLength={productsList.length}
            />
          </div>
          {this.selectOne()}
        </div>
      </div>
    )
  }
}

export default AllProductsSection
