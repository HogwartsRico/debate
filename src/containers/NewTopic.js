import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopicForm from '../components/TopicForm';
import { createTopic } from '../actions/topic';

function NewTopic({ visible, onCancel, createTopic }) {
  return (
    <TopicForm visible={visible} onSubmit={createTopic} onCancel={onCancel} />
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createTopic }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewTopic);
