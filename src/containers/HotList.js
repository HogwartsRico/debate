import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTopicList } from '../actions/topic';
import TopicList from '../components/TopicList';

class HotList extends Component {
  componentWillMount() {
    const { fetchTopicList } = this.props;

    fetchTopicList(true);
  }

  render() {
    const { topicList } = this.props;

    return <TopicList items={topicList} />;
  }
}

const mapStateToProps = state => ({
  topicList: state.topic.topicList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTopicList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotList);
