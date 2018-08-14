import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message } from 'antd';
import { validatePassword } from '../utils';

const FormItem = Form.Item;

class NewPasswordForm extends Component {
  state = {
    submitting: false
  };

  compareToNewPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('new_password')) {
      callback('密码不一致');
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitting: true });
        onSubmit(values)
          .then(() => {
            message.success('修改成功!');
            form.resetFields();
          })
          .catch(error => {
            message.error(error);
            this.setState({ submitting: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.state;

    return (
      <Form className="password-form" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码 为必填项.' }]
          })(<Input type="password" placeholder="当前密码" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('new_password', {
            rules: [{ validator: validatePassword }]
          })(<Input type="password" placeholder="新密码" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('repeat_password', {
            rules: [
              { required: true, message: '密码 为必填项.' },
              {
                validator: this.compareToNewPassword
              }
            ]
          })(<Input type="password" placeholder="重复新密码" />)}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="form-button"
            disabled={submitting}
          >
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNewPasswordForm = Form.create()(NewPasswordForm);

WrappedNewPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default WrappedNewPasswordForm;
