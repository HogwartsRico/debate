import React, { Component } from 'react';
import { Card, Tabs } from 'antd';
import NewPasswordForm from '../components/NewPasswordForm';
import api from '../services/api';

class Settings extends Component {
  handlePutNewPassword = values => {
    return api.putNewPassword(values);
  };

  render() {
    return (
      <Card className="b-settings">
        <Tabs defaultActiveKey="1" animated={false}>
          <Tabs.TabPane tab="基本资料" key="1">
            <div className="settings-item">
              <label className="settings-item-title">用户名</label>
              <div className="settings-item-content">Curiosity</div>
            </div>

            <div className="settings-item">
              <label className="settings-item-title">手机号</label>
              <div className="settings-item-content">13918750392</div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="修改密码" key="2">
            <NewPasswordForm onSubmit={this.handlePutNewPassword} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Settings;
