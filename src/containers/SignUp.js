import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from '../components/SignUpForm';
import { register } from '../actions/auth';
import { setToken } from '../utils';
import { history } from '../store';

class SignUp extends Component {
  handleRegister = values => {
    const { register } = this.props;

    return register(values).then(data => {
      setToken(data.token);
      history.push('/');
    });
  };

  render() {
    return (
      <div className="b-sign">
        <SignUpForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
