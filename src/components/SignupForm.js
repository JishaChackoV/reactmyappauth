import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';


class SignupForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    visible:true,

  };

showModal = () => {
    this.setState({
      visible: true,
    });
  }

    handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: true,
    });
    }

      handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }






  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };



constructor(props) {
    super(props);
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  callback(evt) {
    console.log(evt);
  }





  render() {
    return (
  <Modal  visible={this.state.visible} onOk={this.handleOk}  onCancel={this.handleCancel} onClickBackdrop={this.modalBackdropClicked} >
   <div className="modal-header">


            <Button className="close" aria-label="Close" onClick= {this.handleCancel.bind(this)}  ><span aria-hidden="true"  >&times;</span></Button>

        </div>
   <div class="container">
    <div className="form-group">
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h3>Sign Up</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          class="form-control form-rounded border border-info "
          placeholder="please enter your name"
          required={true}
          minCharacters={3}
          validate={this.commonValidate}
          onChange={this.setContributor}
          errorMessage="Name is invalid"
          emptyMessage="Name is required"

          value={this.state.username}
          onChange={this.handle_change}
        />


        <div class="form-group">
         <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          class="form-control form-rounded  border border-info"
          placeholder="Enter yor email"
          required={true}
          minCharacters={6}
          validate={this.validateEmail}
          onChange={this.handleEmailInput}
          errormessage="Email is invalid"
          emptymessage="Email is required"

          value={this.state.email}
          onChange={this.handle_change}
        />
        </div>
        <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          class="form-control form-rounded  border border-info"
          placeholder="Password"
          required={true}
          validate={this.validatePassword}
          onChange={this.handlePasswordInput}
          errormessage="password is invalid"
          emptymessage="Password is required"
          value={this.state.password}
          onChange={this.handle_change}
        />
        </div>

       <center> <Button bsStyle="danger" className="subbtn" type="submit" ><span className="text">Submit</span></Button></center>
      </form>
      </div>
    </div>
   </Modal>
    );
  }
}







export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};