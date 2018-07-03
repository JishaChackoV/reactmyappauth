import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';


class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
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

  render() {
    return (
    <Modal  visible={this.state.visible} onOk={this.handleOk}  onCancel={this.handleCancel} onClickBackdrop={this.modalBackdropClicked} >

        <div className="modal-header">
            <h3 className="modal-title">
            <center>Log In</center></h3>
            <Button className="close" aria-label="Close" onClick= {this.handleCancel.bind(this)} ><span aria-hidden="true"  >&times;</span></Button>

        </div>

    <div className="modal-body">
    <div class="container">
      <form className="login" onSubmit={e => this.props.handle_login(e, this.state)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          class="form-control form-rounded  border border-info"
          required={true}
          validate={this.commonValidate}
          onChange={this.setContributor}
          errorMessage="Name is invalid"
          emptyMessage="Name is required"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          class="form-control form-rounded  border border-info"
          required={true}
          validate={this.commonValidate}
          onChange={this.setContributor}
          errorMessage="password is invalid"
          emptyMessage="password is required"
          value={this.state.password}
          onChange={this.handle_change}
        />
         <center><Button bsStyle="danger " className="subbtn " type="submit"><span className="text">Submit</span></Button></center>
      </form>
   </div>
   </div>

      </Modal>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};