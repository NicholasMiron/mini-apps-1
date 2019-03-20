class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  handleCheckoutClick() {
    console.log('hello');
  }

  render() {
    return(
      <>
        <button onClick={this.handleCheckoutClick}>Checkout</button>
      </>
    )
  }

}


ReactDOM.render(<App />, document.getElementById('root'));