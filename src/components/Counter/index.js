import './index.css'

const Counter = props => {
  const {quantity, onClickPlus, onClickMinus} = props
  const plusClicked = () => {
    onClickPlus()
  }
  const minusClicked = () => {
    onClickMinus()
  }
  return (
    <div className="counter-cont">
      <button
        type="button"
        data-testid="decrement-count"
        onClick={minusClicked}
      >
        -
      </button>
      <p data-testid="active-count">{quantity}</p>
      <button type="button" data-testid="increment-count" onClick={plusClicked}>
        +
      </button>
    </div>
  )
}

export default Counter
