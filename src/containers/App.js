import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Loadable from 'react-loadable';
import AuthRoute from '../components/AuthRoute';
import Navbar from '../components/Navbar';
import { logout, getUser } from '../actions/auth';
import Loading from '../components/Loading';

const Home = Loadable({
  loader: () => import('./Home'),
  loading() {
    return <Loading />;
  }
});

const HotList = Loadable({
  loader: () => import('./HotList'),
  loading() {
    return <Loading />;
  }
});

const Detail = Loadable({
  loader: () => import('./Detail'),
  loading() {
    return <Loading />;
  }
});

const Settings = Loadable({
  loader: () => import('./Settings'),
  loading() {
    return <Loading />;
  }
});

const Profile = Loadable({
  loader: () => import('./Profile'),
  loading() {
    return <Loading />;
  }
});

class App extends Component {
  componentWillMount() {
    const { isAuthenticated, getUser } = this.props;

    if (isAuthenticated) {
      getUser();
    }
  }

  render() {
    const { pathname, isAuthenticated, user, logout } = this.props;

    return (
      <div className="has-navbar-fixed-top">
        <Navbar
          pathname={pathname}
          isAuthenticated={isAuthenticated}
          user={user}
          logout={logout}
        />
        <div className="container-wrapper">
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/hot" component={HotList} />
            <Route exact path="/topic/:id" component={Detail} />
            <AuthRoute
              isAuthenticated={isAuthenticated}
              path="/settings"
              component={Settings}
            />
            <Route path="/user/:uid" component={Profile} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      getUser
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
