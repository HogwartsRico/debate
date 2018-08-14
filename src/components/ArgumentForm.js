import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Avatar, Button, Radio } from 'antd';
const { TextArea } = Input;

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ArgumentForm extends Component {
  state = {
    submitting: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit({ data: values, cb: () => form.resetFields() });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.state;
    const { user, viewpoints } = this.props;

    return (
      <Card className="b-argument">
        <div className="head">
          <Avatar className="avatar" size="small" src={user.avatar} />
          <span className="author">{user.username}</span>
        </div>

        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('viewpoint_id', {
              rules: [
                {
                  required: true,
                  message: '请选择持方'
                }
              ]
            })(
              <RadioGroup>
                {viewpoints.map((viewpoint, i) => (
                  <RadioButton key={i} value={viewpoint.id}>
                    {viewpoint.content}
                  </RadioButton>
                ))}
              </RadioGroup>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入内容'
                }
              ]
            })(
              <TextArea autosize={{ minRows: 4 }} placeholder="输入你的论述" />
            )}
          </FormItem>

          <div className="foot">
            <Button type="primary" htmlType="submit" disabled={submitting}>
              提交
            </Button>
          </div>
        </Form>
      </Card>
    );
  }
}

const WrappedArgumentForm = Form.create()(ArgumentForm);

WrappedArgumentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  viewpoints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      side: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired
    })
  ),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  })
};

export default WrappedArgumentForm;
