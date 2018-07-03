import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import profile from './components/profile';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
  let token = `JWT ${localStorage.getItem('token')}`;
    if (this.state.logged_in) {
      console.log(`JWT ${localStorage.getItem('token')}`);
      fetch('http://127.0.0.1:8001/core/current_user/', {

        headers: new Headers({
         'Authorization': token,
          'Content-Type': 'application/json'

       }),
	   method: 'GET',

      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });

    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8001/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data)

})
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.user) {
        if(json.user.username !== ""){
       localStorage.setItem('token', json.token);
//       const b=json.token
//       console.log(b)
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });}
        }
        else{
        this.setState({
          logged_in: false,
          displayed_form: '',
        });}
      })
  }



  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8001/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
      console.log(json)
       localStorage.setItem('token', json.token);
          this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });

      })
};
  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  handle_profile = (e,data) =>{
    e.preventDefault();
    fetch('http://127.0.0.1:8001/token-auth/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)

   })
   .then(res => res.json())
      .then(json => {
      console.log(json)
       localStorage.getItem('token', json.token);
          this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,

        });

      })

  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'profile':
        form = <profile handle_profile={this.handle_profile} />

      default:
        form = null;
    }


    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`: 'Please Log In....!'}
        </h3>
      </div>
    );
  }
}




export default App;
