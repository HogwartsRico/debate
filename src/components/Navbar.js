import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import NewTopic from '../containers/NewTopic';

class Navbar extends Component {
  state = {
    isMenuActive: false,
    isDropdownActive: false,
    isNewTopicActive: false
  };

  handleCloseMenu = () => {
    const { isMenuActive, isDropdownActive } = this.state;

    if (isMenuActive) {
      this.setState({
        isMenuActive: false
      });
    }

    if (isDropdownActive) {
      document.removeEventListener('click', this.handleOutsideClick, false);
      this.setState({
        isDropdownActive: false
      });
    }
  };

  handleDropdownActive = () => {
    const { isDropdownActive } = this.state;

    if (!isDropdownActive) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      isDropdownActive: !isDropdownActive
    });
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleDropdownActive();
  };

  handleLogout = () => {
    const { logout } = this.props;

    this.handleCloseMenu();
    logout();
  };

  render() {
    const { pathname, user, isAuthenticated } = this.props;
    const { isMenuActive, isDropdownActive, isNewTopicActive } = this.state;

    return (
      <nav className="b-navbar navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item navbar-logo" to="/">
              <span>辩</span>
              <span>论</span>
              <span>圈</span>
            </Link>
            <div
              className={`navbar-burger${isMenuActive ? ' is-active' : ''}`}
              data-target="navMenu"
              onClick={() => this.setState({ isMenuActive: !isMenuActive })}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            className={`navbar-menu${isMenuActive ? ' is-active' : ''}`}
            id="navMenu"
          >
            <Link
              className={`navbar-item${pathname === '/' ? ' is-active' : ''}`}
              to="/"
              onClick={this.handleCloseMenu}
            >
              首页
            </Link>
            <Link
              className={`navbar-item${
                pathname === '/hot' ? ' is-active' : ''
              }`}
              to="/hot"
              onClick={this.handleCloseMenu}
            >
              热门
            </Link>
            {isAuthenticated && (
              <div className="navbar-item">
                <Button
                  type="primary"
                  onClick={() =>
                    this.setState({ isNewTopicActive: !isNewTopicActive })
                  }
                >
                  新辩题
                </Button>
              </div>
            )}
            <div className="navbar-end">
              {!isAuthenticated && (
                <Link className="navbar-item" to="/signin">
                  登录
                </Link>
              )}
              {user && (
                <div
                  className={`navbar-item has-dropdown${
                    isDropdownActive ? ' is-active' : ''
                  }`}
                  ref={node => {
                    this.node = node;
                  }}
                >
                  <a
                    className="navbar-link"
                    onClick={this.handleDropdownActive}
                  >
                    <Avatar size="small" src={user.avatar} />
                  </a>
                  <div className="navbar-dropdown is-right">
                    <Link
                      className="navbar-item"
                      onClick={this.handleCloseMenu}
                      to={`/user/${user.uid}`}
                    >
                      我的主页
                    </Link>
                    <Link
                      className="navbar-item"
                      onClick={this.handleCloseMenu}
                      to="/settings"
                    >
                      设置
                    </Link>
                    <hr className="navbar-divider" />
                    <a className="navbar-item" onClick={this.handleLogout}>
                      登出
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <NewTopic
          visible={isNewTopicActive}
          onCancel={() =>
            this.setState({ isNewTopicActive: !isNewTopicActive })
          }
        />
      </nav>
    );
  }
}

Navbar.protoTypes = {
  pathname: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  avatarUri: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  })
};

export default Navbar;
