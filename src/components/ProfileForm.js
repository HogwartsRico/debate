import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Avatar, Input, Button, Icon, Modal, Slider } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import api from '../services/api';
import { dataURItoBlob } from '../utils';

const FormItem = Form.Item;
const { TextArea } = Input;

const QINIU_HOST = 'http://static.bianlunquan.com/';

class ProfileForm extends Component {
  state = {
    newAvatar: '',
    uploadedAvatar: '',
    avatarEditorVisible: false,
    scale: 1.2
  };

  componentDidMount() {
    const { user, form } = this.props;

    form.setFieldsValue({
      avatar: user.avatar,
      bio: user.bio
    });
  }

  handleNewAvatar = e => {
    this.setState({
      newAvatar: e.target.files[0],
      avatarEditorVisible: true
    });
  };

  handleSaveAvatar = () => {
    const { form } = this.props;

    const canvas = this.avatarEditor.getImage().toDataURL();
    const data = dataURItoBlob(canvas);
    api.fetchQiniuUploadToken().then(resp => {
      const token = resp.token;
      const formData = new FormData();
      formData.append('file', data);
      formData.append('token', token);
      api.qiniuUpload(formData).then(resp => {
        this.setState({
          avatarEditorVisible: false,
          uploadedAvatar: QINIU_HOST + resp.hash
        });
        form.setFieldsValue({ avatar: QINIU_HOST + resp.hash });
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user, onCancel } = this.props;
    const {
      avatarEditorVisible,
      newAvatar,
      scale,
      uploadedAvatar
    } = this.state;

    return (
      <Form className="profile-wrapper" onSubmit={this.handleSubmit}>
        <div className="profile">
          <div className="profile-item">
            <div className="avatar-editor">
              <Avatar
                className="avatar large-avatar"
                src={uploadedAvatar ? uploadedAvatar : user.avatar}
              />
              <div className="avatar-overlay" />
              <div
                className="avatar-editor-button-wrapper"
                onClick={() => this.newAvatarRef.click()}
              >
                <Icon className="icon" type="picture" />
                <div>修改头像</div>
              </div>
            </div>
            <FormItem>
              {getFieldDecorator('avatar', {
                rules: [
                  {
                    required: true,
                    message: '头像不能为空'
                  }
                ]
              })(<Input type="hidden" />)}
            </FormItem>
          </div>
          <div className="profile-item">
            <div className="info">
              <p className="info-item author name">{user.username}</p>
              <FormItem className="info-item">
                {getFieldDecorator('bio')(
                  <TextArea placeholder="简介" autosize />
                )}
              </FormItem>
            </div>
          </div>
        </div>
        <div className="profile-footer">
          <Button type="primary" onClick={onCancel} ghost>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </div>
        <input
          style={{ display: 'none' }}
          type="file"
          ref={ref => (this.newAvatarRef = ref)}
          onChange={this.handleNewAvatar}
        />
        <Modal
          title="头像编辑"
          className="avatar-editor"
          visible={avatarEditorVisible}
          footer={[
            <Button
              key="cancel"
              onClick={() =>
                this.setState({ avatarEditorVisible: !avatarEditorVisible })
              }
            >
              取消
            </Button>,
            <Button key="save" type="primary" onClick={this.handleSaveAvatar}>
              保存
            </Button>
          ]}
        >
          <AvatarEditor
            ref={node => (this.avatarEditor = node)}
            image={newAvatar}
            width={200}
            height={200}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            borderRadius={100}
          />
          <Slider
            defaultValue={scale}
            tipFormatter={null}
            min={1}
            max={2}
            step={0.01}
            onChange={value => this.setState({ scale: value })}
          />
        </Modal>
      </Form>
    );
  }
}

const WrappedProfileForm = Form.create()(ProfileForm);

WrappedProfileForm.protoTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default WrappedProfileForm;
