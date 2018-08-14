import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from '../components/SignInForm';
import { login } from '../actions/auth';
import { setToken } from '../utils';

class SignIn extends Component {
  componentWillMount() {
    const { isAuthenticated, history } = this.props;

    if (isAuthenticated) history.push('/');
  }

  handleLogin = values => {
    const { history, login, location } = this.props;
    console.log(location);
    const { from } = location.state || { from: { pathname: '/' } };

    return login(values).then(data => {
      setToken(data.token);
      history.push(from);
    });
  };

  render() {
    return (
      <div className="b-sign">
        <SignInForm onSubmit={this.handleLogin} />
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
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
