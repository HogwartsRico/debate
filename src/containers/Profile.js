import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Avatar, Tabs, Button, List } from 'antd';
import Loading from '../components/Loading';
import api from '../services/api';
import ProfileForm from '../components/ProfileForm';
import { formatTime } from '../utils';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      topics: [],
      userArguments: [],
      edit: false
    };

    const { match } = props;
    this.uid = match.params.uid;
  }

  componentWillMount() {
    api.fetchUserProfile(this.uid).then(resp => {
      this.setState({ profile: resp });
    });
    api.fetchUserTopics(this.uid).then(resp => {
      this.setState({ topics: resp });
    });
    api.fetchUserArguments(this.uid).then(resp => {
      this.setState({ userArguments: resp });
    });
  }

  handleProfileUpdate = data => {
    api.updateProfile(data).then(() => {
      this.setState({ edit: false });
      api.fetchUserProfile(this.uid).then(resp => {
        this.setState({ profile: resp });
      });
    });
  };

  render() {
    const { profile, topics, userArguments, edit } = this.state;
    const { user } = this.props;

    if (profile) {
      return (
        <div className="b-profile">
          <Card>
            {!edit && (
              <div className="profile-wrapper">
                <div className="profile">
                  <div className="profile-item">
                    <Avatar
                      className="avatar large-avatar "
                      src={profile.avatar}
                    />
                  </div>
                  <div className="profile-item">
                    <div className="info">
                      <p className="info-item author name">
                        {profile.username}
                      </p>
                      <p className="info-item">{profile.bio}</p>
                    </div>
                  </div>
                </div>
                {user &&
                  user.uid === profile.uid && (
                    <div className="profile-footer">
                      <Button
                        type="primary"
                        ghost
                        onClick={() => this.setState({ edit: !edit })}
                      >
                        编辑
                      </Button>
                    </div>
                  )}
              </div>
            )}
            {edit && (
              <ProfileForm
                user={profile}
                onCancel={() => this.setState({ edit: !edit })}
                onSubmit={this.handleProfileUpdate}
              />
            )}
          </Card>
          <Card className="profile-content">
            <Tabs defaultActiveKey="0" animated={false}>
              <Tabs.TabPane tab="辩论" key="0">
                <List
                  itemLayout="vertical"
                  dataSource={userArguments}
                  locale={{ emptyText: '暂无' }}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={
                          <Link to={`/topic/${item.topic.id}`}>
                            <h3 className="title">{item.topic.title}</h3>
                          </Link>
                        }
                        description={
                          <div className="content">
                            <p>{item.content}</p>
                            <span className="time">
                              {formatTime(
                                new Date(item.created_at),
                                'y-m-d h:i',
                                true
                              )}
                            </span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="创建的辩题" key="1">
                <List
                  itemLayout="vertical"
                  dataSource={topics}
                  locale={{ emptyText: '暂无' }}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={
                          <Link to={`/topic/${item.id}`}>
                            <h3 className="title">{item.title}</h3>
                          </Link>
                        }
                        description={formatTime(
                          new Date(item.created_at),
                          'y-m-d h:i',
                          true
                        )}
                      />
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
