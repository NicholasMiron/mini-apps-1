//Account Creation Form
function Account(props) {
  return (
    <form>
      <p>
        <label for='name'>Name: </label> 
        <input name='name' id='name' type='text'></input>
      </p>
      <p>
        <label for='email'>Email: </label> 
        <input name='email' id='email' type='text'></input>
      </p>
      <p>
        <label for='password'>Password: </label> 
        <input name='password' id='password' type='text'></input>
      </p>
      <input type='submit'></input>
    </form>
  )
}

//Shipping Info Form
function Shipping(props) {
  return (
    <form>
      <p>
        <label for='address1'>Address Line 1:</label>
        <input name='address1' id='address1' type='text'></input>
      </p>
      <p>
        <label for='address2'>Address Line 2:</label>
        <input name='address2' id='address2' type='text'></input>
      </p>
      <p>
        <label for='city'>City:</label>
        <input name='city' id='city' type='text'></input>
      </p>
      <p>
        <label for='state'>State:</label>
        <input name='state' id='state' type='text'></input>
      </p>
      <p>
        <label for='zipcode'>Zipcode:</label>
        <input name='zipcode' id='zipcode' type='text'></input>
      </p>
      <p>
        <label for='phone'>Phone Number:</label>
        <input name='phone' id='phone' type='text'></input>
      </p>
      <input type='submit'></input>
    </form>
  )
}

//Payment Form
function Payment(props) {
  return (
    <form>
      <p>
        <label for='card'>Card:</label>
        <input name='card' id='card' type='text'></input>
      </p>
      <p>
        <label for='expiration'>Expiration Date:</label>
        <input name='expiration' id='expiration' type='text'></input>
      </p>
      <p>
        <label for='cvv'>CVV:</label>
        <input name='cvv' id='cvv' type='text'></input>
      </p>
      <p>
        <label for='billzip'>Billing Zipcode:</label>
        <input name='billzip' id='billzip' type='text'></input>
      </p>
      <p>
        <input type='submit'></input>
      </p>
    </form>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountOn:false,
      shippingOn:false,
      paymentOn:false
    }
  }
  
  handleCheckoutClick() {
    console.log('hello');
  }

  render() {
    return(
      <>
        <button onClick={this.handleCheckoutClick}>Checkout</button>
        <Account />
        <Shipping />
        <Payment />
      </>
    )
  }

}


ReactDOM.render(<App />, document.getElementById('root'));