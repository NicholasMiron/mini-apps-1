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

  handleSubmit() {
    let {name, email, password, password2} = this.state.formData;
    if(name === '') {
      alert('Please fill in all fields (name)');
    } else if (email === '') {
      alert('Please fill in all fields (email)');
    } else if (password === '') {
      alert('Please fill in all fields (password)');
    } else if (password !== password2) {
      alert("Passwords don't match");
    } else {
      this.props.accountButton(this.state.formData);
    }
  }

  render() {
    return (
      <form>
      <p>
        <label htmlFor='name'>Name: 
          <input maxLength='20' name='name' id='name' type='text' onChange={(e) => this.handleChange(e)}></input>
        </label> 
      </p>
      <p>
        <label htmlFor='email'>Email: 
          <input maxLength='50' name='email' id='email' type='email' onChange={(e) => this.handleChange(e)}></input>
        </label> 
      </p>
      <p>
        <label htmlFor='password1'>Password: 
          <input maxLength='20' name='password' id='password' type='password' onChange={(e) => this.handleChange(e)}></input>
        </label> 
      </p>
      <p>
        <label htmlFor='password2'>Confirm Password:
          <input maxLength='20' name='password2' id='password2' type='password' onChange={(e) => this.handleChange(e)}></input>
        </label>
      </p>
      <input type='submit' value='Next' onMouseUp={() => this.handleSubmit()}></input>
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
            <input maxLength='40' name='address1' id='address1' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='address2'>Address Line 2:
            <input maxLength='40' name='address2' id='address2' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='city'>City:
            <input maxLength='20' name='city' id='city' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='state'>State:
            <input maxLength='15' name='state' id='state' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='zipcode'>Zipcode:
            <input maxLength='5' name='zipcode' id='zipcode' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='phone'>Phone Number:
            <input maxLength='10' name='phone' id='phone' type='text' onChange={(e) => this.handleChange(e)}></input>
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
            <input maxLength='20' name='card' id='card' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='expiration'>Expiration Date:
            <input maxLength='4' name='expiration' id='expiration' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='cvv'>CVV:
            <input maxLength='5' name='cvv' id='cvv' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <label htmlFor='billzip'>Billing Zipcode:
            <input maxLength='5' name='billzip' id='billzip' type='text' onChange={(e) => this.handleChange(e)}></input>
          </label>
        </p>
        <p>
          <input type='button' value='Next' onClick={() => this.props.payButton(this.state.formData)}></input>
        </p>
      </form>
    )
  }
}

//Confirmation Form
function Confirmation({formData, goHome}) {
  console.log(formData)
  return (
    <>
      <h1>IS YOUR DATA WRITE</h1>
      <div>
        <h3>Account Info</h3>
        <p>{formData.account.name}</p>
        <p>{formData.account.email}</p>
        <p>{formData.account.password}</p>
        <h3>Shipping Info</h3>
        <p>{formData.shipping.address1}</p>
        <p>{formData.shipping.address2}</p>
        <p>{formData.shipping.city}</p>
        <p>{formData.shipping.state}</p>
        <p>{formData.shipping.zipcode}</p>
        <p>{formData.shipping.phone}</p>
        <h3>Payment Info</h3>
        <p>{formData.payment.card}</p>
        <p>{formData.payment.expiration}</p>
        <p>{formData.payment.cvv}</p>
        <p>{formData.payment.billzip}</p>
      </div>
      <button onClick={() => goHome()}>TAKE ME MONEY</button>
    </>
  )
}


//Main app where some stuff happens
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout:true,
      accountOn:false,
      shippingOn:false,
      paymentOn:false,
      confirmation: false,
      accountInfo: {},
      shippingInfo: {},
      paymentInfo: {}
    }
  }
  
  handleCheckoutClick() {
    this.setState({
      accountOn: true,
      checkout:false
    })
  }

  handleAccountComplete(formData) {
    this.setState({
      accountOn: false,
      shippingOn: true,
      accountInfo: formData
    })
  }

  handleShippingComplete(formData) {
      this.setState({
        shippingOn: false,
        paymentOn: true,
        shippingInfo: formData
      })
  }

  handlePaymentComplete(formData) {
    console.log(formData)
    this.setState({
      paymentOn:false,
      confirmation: true,
      paymentInfo: formData
    });
  }

  handleConfirmationComplete() {
    this.setState({
      confirmation: false,
      checkout: true
    })

    const formData = {
      "account": this.state.accountInfo,
      "shipping": this.state.shippingInfo,
      "payment": this.state.paymentInfo
    }

    fetch('/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
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
      return (
        <>
          <button onClick={this.handleCheckoutClick.bind(this)}>Checkout</button>
        </>
      )
    } else if(this.state.confirmation) {
      const formData = {
        account: this.state.accountInfo,
        shipping: this.state.shippingInfo,
        payment: this.state.paymentInfo
      }
      return (
        <>
          <Confirmation formData={formData} goHome={this.handleConfirmationComplete.bind(this)}/>
        </>
      )
    }
  }

}


ReactDOM.render(<App />, document.getElementById('root'));