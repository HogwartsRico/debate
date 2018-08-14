import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import {
  validateUsername,
  validateMobile,
  validateVerificationCode,
  validatePassword
} from '../utils';
import api from '../services/api';
import CaptchaForm from './CaptchaForm';

const FormItem = Form.Item;

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      submitting: false,
      captchaModalVisiable: false,
      captchaImage: '',
      captchaError: '',
      sendAvailable: true,
      sendLeftSeconds: 0
    };

    this.timer = null;
  }

  handleMobileChange = e => {
    e.preventDefault();

    this.setState({ mobile: e.target.value });
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

  handleSendVerificationCode = () => {
    const { form } = this.props;
    const { captchaImage } = this.state;

    form.validateFields(['mobile'], { force: true }, (err, values) => {
      if (!err) {
        form.resetFields(['captcha']);
        if (captchaImage) {
          this.setState({ captchaModalVisiable: true });
        } else {
          this.genCaptcha();
        }
      }
    });
  };

  genCaptcha = () => {
    const { mobile } = this.state;

    api
      .getCaptcha({ mobile })
      .then(response => {
        if (response.image) {
          this.setState({
            captchaModalVisiable: true,
            captchaImage: response.image
          });
        }
      })
      .catch(error => {
        message.error(error);
      });
  };

  validateCaptcha = (rule, captcha, callback) => {
    const { captchaError } = this.state;
    if (captcha.length === 6 && captchaError) {
      callback(captchaError);
    }
  };

  handleCaptchaValueChange = e => {
    const captcha = e.target.value;
    const { form } = this.props;

    if (captcha.length === 6) {
      const mobile = form.getFieldValue('mobile');
      api
        .sendVerificationCode({ mobile, captcha })
        .then(response => {
          this.setState({
            captchaModalVisiable: false,
            captchaError: '',
            sendAvailable: false,
            sendLeftSeconds: 60
          });
          this.verificationCodeTimer();
        })
        .catch(err => {
          this.setState({ captchaError: err });
          form.validateFields(['captcha'], { force: true });
        });
    }
  };

  handleCaptchaValidateSuccess = () => {
    this.setState({
      captchaModalVisiable: false,
      sendAvailable: false,
      sendLeftSeconds: 60
    });
    this.startVerificationCodeTimer();
  };

  startVerificationCodeTimer = () => {
    this.timer = setInterval(() => {
      const { sendLeftSeconds } = this.state;
      if (sendLeftSeconds > 1) {
        this.setState({ sendLeftSeconds: this.state.sendLeftSeconds - 1 });
      } else {
        this.setState({
          sendAvailable: true,
          sendLeftSeconds: 0,
          captchaImage: ''
        });
        clearInterval(this.timer);
      }
    }, 1000);
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      mobile,
      submitting,
      captchaModalVisiable,
      captchaImage,
      sendAvailable,
      sendLeftSeconds
    } = this.state;

    return (
      <Card className="sign-form" title={<Link to="/">辩论圈</Link>}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ validator: validateUsername }]
            })(<Input placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{ validator: validateMobile }]
            })(
              <Input placeholder="手机号" onChange={this.handleMobileChange} />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={5}>
              <Col span={14}>
                {getFieldDecorator('verificationCode', {
                  rules: [{ validator: validateVerificationCode }]
                })(<Input placeholder="手机验证码" />)}
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  onClick={this.handleSendVerificationCode}
                  disabled={sendAvailable ? false : true}
                >
                  发送验证码{sendLeftSeconds > 0 ? sendLeftSeconds : ''}
                </Button>
              </Col>
            </Row>
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
              注册
            </Button>
            <div className="has-text-centered">
              已有账号？<Link to="/signin">登录</Link>
            </div>
          </FormItem>
        </Form>
        <CaptchaForm
          mobile={mobile}
          visible={captchaModalVisiable}
          onCancel={() => this.setState({ captchaModalVisiable: false })}
          captchaImage={captchaImage}
          onValidateSuccess={this.handleCaptchaValidateSuccess}
          onGenerateCaptcha={this.genCaptcha}
        />
      </Card>
    );
  }
}

const WrappedSignUpForm = Form.create()(SignUpForm);

WrappedSignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default WrappedSignUpForm;
