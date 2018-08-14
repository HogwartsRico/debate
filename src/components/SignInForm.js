import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import { validateMobile, validatePassword } from '../utils';

const FormItem = Form.Item;

class SignInForm extends Component {
  state = {
    submitting: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitting: true });
        onSubmit(values).catch(error => {
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
      <Card className="sign-form" title={<Link to="/">辩论圈</Link>}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{ validator: validateMobile }]
            })(<Input placeholder="手机号" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ validator: validatePassword }]
            })(<Input type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="form-button"
              disabled={submitting}
            >
              登录
            </Button>
            <div className="has-text-centered">
              还没有账号？<Link to="/signup">注册新账号</Link>
            </div>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const WrappedSignInForm = Form.create()(SignInForm);

WrappedSignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default WrappedSignInForm;
