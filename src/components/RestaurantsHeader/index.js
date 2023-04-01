import {MdOutlineSort} from 'react-icons/md'
import './index.css'

const RestaurantsHeader = props => {
  const {sortByOptions, activeSortByOption, onChangeSortByOptions} = props

  const onChangeSortOption = event => {
    onChangeSortByOptions(event.target.value)
  }

  return (
    <div className="header">
      <h1 className="rest-heading">Popular Restaurants</h1>
      <div className="para-sortBy">
        <p className="rest-para">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-div">
          <MdOutlineSort color=" #475569" className="sort-icon" />
          <p className="sort-text">Sort by</p>
          <div className="sort-options">
            <select
              name="sort-select"
              value={activeSortByOption}
              onChange={onChangeSortOption}
              className="sort-select"
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <hr className="dashed-line" />
    </div>
  )
}
export default RestaurantsHeader
