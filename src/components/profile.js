import React, {PropTypes} from 'react';
import {connect} from 'react-redux';


class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {isEditing: false,
                    username: '',
                     email: '',
                     password: '',


    };
  }

  render() {
//    if (this.state.isEditing) {
//      return (
//      <div>
//        <h1>edit profile</h1>
//        < user form coming soon!/>
//      </div>
//      )
//    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.state.user.username}</h1>
        <p>name:{this.state.user.username}</p>
        <p>email: {this.state.user.email}</p>
        <p>password: {this.state.user.password}</p>
      </div>

    );
  }
}

export default Profile;
