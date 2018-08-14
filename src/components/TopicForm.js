import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, message } from 'antd';
import { validateTopicTitle, validateViewpoint } from '../utils';
import { VIEWPOINT_PRO, VIEWPOINT_CON } from '../constants/keys';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class TopicForm extends Component {
  state = {
    pro: '',
    con: ''
  };

  handleProChange = e => {
    this.setState({ pro: e.target.value });
  };

  handleConChange = e => {
    this.setState({ con: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, onSubmit, onCancel } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        let data = {
          title: values.title,
          viewpoints: [
            {
              side: VIEWPOINT_PRO,
              content: values.pro
            },
            {
              side: VIEWPOINT_CON,
              content: values.con
            }
          ],
          description: values.description
        };
        onSubmit(data)
          .then(() => {
            form.resetFields();
            onCancel();
          })
          .catch(err => message.error(err));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel } = this.props;

    return (
      <Modal
        visible={visible}
        title="创建新辩题"
        onCancel={onCancel}
        footer={null}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ validator: validateTopicTitle }]
            })(<Input placeholder="辩题" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('description')(
              <TextArea
                placeholder="辩题描述(可选)"
                autosize={{ minRows: 4 }}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pro', {
              rules: [{ validator: validateViewpoint }]
            })(
              <Input placeholder="正方观点" onChange={this.handleProChange} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('con', {
              rules: [{ validator: validateViewpoint }]
            })(
              <Input placeholder="反方观点" onChange={this.handleConChange} />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedTopicForm = Form.create()(TopicForm);

WrappedTopicForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default WrappedTopicForm;
