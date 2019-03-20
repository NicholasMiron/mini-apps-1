//Account Creation form
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  }

  handleChange(event) {
    let current = this.state.formData;
    current[event.target.id] = event.target.value;
    this.setState({
      formData: current
    })
  }

  render() {
    return (
      <form>
      <p>
        <label htmlFor='name'>Name: 
          <input name='name' id='name' type='text' onChange={(e) => this.handleChange(e)}></input>
        </label> 
      </p>
      <p>
        <label htmlFor='email'>Email: 
          <input name='email' id='email' type='text' onChange={(e) => this.handleChange(e)}></input>
        </label> 
      </p>
      <p>
        <label htmlFor='password'>Password: 
          <input name='password' id='password' type='text' onChange={(e) => this.handleChange(e)}></input>
        </label> 
      </p>
      <input type='button' value='Next' onClick={() => this.props.accountButton(this.state.formData)}></input>
    </form>
  )
  }
}

//Shipping Info form
class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        phone: ''
      }
    }
  }

  handleChange(event) {
    let current = this.state.formData;
    current[event.target.id] = event.target.value;
    this.setState({
      formData: current
    })
  }

  render() {

    return (
      <form>
        <p>
          <label htmlFor='address1'>Address Line 1:
            <input name='address1' id='address1' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='address2'>Address Line 2:
            <input name='address2' id='address2' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='city'>City:
            <input name='city' id='city' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='state'>State:
            <input name='state' id='state' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='zipcode'>Zipcode:
            <input name='zipcode' id='zipcode' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='phone'>Phone Number:
            <input name='phone' id='phone' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <input type='button' value='Next' onClick={() => this.props.shipButton(this.state.formData)}></input>
      </form>
    )
  }
}

//Payment form
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        card: '',
        expiration: '',
        cvv: '',
        billzip: ''
      }
    }
  }
  
  handleChange(event) {
    let current = this.state.formData;
    current[event.target.id] = event.target.value;
    this.setState({
      formData: current
    })
  }

  render() {
    return (
      <form>
        <p>
          <label htmlFor='card'>Card:
            <input name='card' id='card' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='expiration'>Expiration Date:
            <input name='expiration' id='expiration' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='cvv'>CVV:
            <input name='cvv' id='cvv' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='billzip'>Billing Zipcode:
            <input name='billzip' id='billzip' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <input type='button' value='Next' onClick={() => this.props.payButton(this.state.formData)}></input>
        </p>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout:true,
      accountOn:false,
      shippingOn:false,
      paymentOn:false
    }
  }
  
  handleCheckoutClick() {
    this.setState({
      accountOn: true,
      checkout:false
    })
  }

  handleAccountComplete(formData) {
    console.log(formData);
    this.setState({
      accountOn: false,
      shippingOn: true
    })
  }

  handleShippingComplete(formData) {
    console.log(formData)
    this.setState({
      shippingOn: false,
      paymentOn: true
    })
  }

  handlePaymentComplete(formData) {
    console.log(formData)
    this.setState({
      paymentOn:false,
      checkout: true
    });
  }

  render() {
    if(this.state.accountOn) {
      return (
        <>
          <Account accountButton={this.handleAccountComplete.bind(this)} />
        </>
      )
    } else if(this.state.shippingOn) {
      return (
        <>
          <Shipping shipButton={this.handleShippingComplete.bind(this)} />
        </>
      )
    } else if(this.state.paymentOn) {
      return (
        <>
          <Payment payButton={this.handlePaymentComplete.bind(this)} />
        </>
      )
    } else if(this.state.checkout) {
      return(
        <>
          <button onClick={this.handleCheckoutClick.bind(this)}>Checkout</button>
        </>
      )
    }
  }

}


ReactDOM.render(<App />, document.getElementById('root'));