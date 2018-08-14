import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Row, Col, Button, Input } from 'antd';
import api from '../services/api';

const FormItem = Form.Item;

class CaptchaForm extends Component {
  state = {
    captchaError: ''
  };

  validateCaptcha = (rule, captcha, callback) => {
    const { captchaError } = this.state;
    if (captcha.length === 6 && captchaError) {
      callback(captchaError);
    }
  };

  handleCaptchaValueChange = e => {
    const captcha = e.target.value;
    const { form, mobile, onValidateSuccess } = this.props;

    if (captcha.length === 6) {
      api
        .sendVerificationCode({ mobile, captcha })
        .then(response => {
          this.setState({
            captchaError: ''
          });
          onValidateSuccess();
        })
        .catch(err => {
          this.setState({ captchaError: err });
          form.validateFields(['captcha'], { force: true });
        });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, captchaImage, onGenerateCaptcha } = this.props;

    return (
      <Modal
        className="captcha-form"
        visible={visible}
        title="人机验证"
        footer={null}
        onCancel={onCancel}
      >
        <Form>
          <FormItem className="has-text-centered">
            <Row gutter={8}>
              <Col span={20}>
                <img src={captchaImage} alt="captcha" />
              </Col>
              <Col span={4}>
                <Button
                  shape="circle"
                  icon="reload"
                  onClick={onGenerateCaptcha}
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator('captcha', {
              rules: [{ validator: this.validateCaptcha }]
            })(
              <Input
                placeholder="请输入验证码"
                onChange={this.handleCaptchaValueChange}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedCaptchaForm = Form.create()(CaptchaForm);

WrappedCaptchaForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  captchaImage: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  onValidateSuccess: PropTypes.func.isRequired,
  onGenerateCaptcha: PropTypes.func.isRequired
};

export default WrappedCaptchaForm;
