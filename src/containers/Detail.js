import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';
import Topic from '../components/Topic';
import Arguments from '../components/Arguments';
import ArgumentForm from '../components/ArgumentForm';
import Loading from '../components/Loading';
import {
  fetchTopic,
  fetchTopicArguments,
  createTopicArgument,
  postVote,
  updateTopic,
  postLike,
  updateTopicArguments
} from '../actions/topic';
import {
  VOTE_TYPE_UP,
  VOTE_TYPE_CANCEL,
  LIKE_TYPE_UP,
  LIKE_TYPE_CANCEL
} from '../constants/keys';

class Detail extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    this.id = match.params.id;
  }

  componentWillMount() {
    const { fetchTopic, fetchTopicArguments } = this.props;

    fetchTopic(this.id).then(resp => {
      document.title = resp.title;
    });
    fetchTopicArguments(this.id);
  }

  handlePostArgument = ({ data, cb }) => {
    const { createTopicArgument, fetchTopicArguments } = this.props;
    createTopicArgument({ data, id: this.id })
      .then(() => {
        cb();
        fetchTopicArguments(this.id);
      })
      .catch(err => message.error(err));
  };

  handlePostVote = viewpointId => {
    const {
      user,
      topic,
      postVote,
      isPendingPostVote,
      updateTopic
    } = this.props;

    if (!user) {
      message.error('请先登录');
      return;
    }

    if (topic && !isPendingPostVote) {
      const voteType =
        viewpointId === topic.user_vote_viewpoint_id
          ? VOTE_TYPE_CANCEL
          : VOTE_TYPE_UP;
      postVote({
        id: this.id,
        data: {
          viewpoint_id: viewpointId,
          vote_type: voteType
        }
      }).then(resp => {
        let topicCopy = { ...topic };
        for (let viewpoint of topic.viewpoints) {
          if (viewpoint.id === viewpointId) {
            viewpoint.votes_count = resp.votes_count;
          } else if (!isNaN(resp.oppose_votes_count)) {
            viewpoint.votes_count = resp.oppose_votes_count;
          }
        }
        if (voteType === VOTE_TYPE_UP) {
          topicCopy.user_vote_viewpoint_id = viewpointId;
        } else {
          topicCopy.user_vote_viewpoint_id = 0;
        }
        updateTopic(topicCopy);
      });
    }
  };

  handlePostLike = (argumentId, userLike) => {
    const {
      argumentList,
      postLike,
      isPendingPostLike,
      updateTopicArguments,
      user
    } = this.props;

    if (user && !isPendingPostLike) {
      const likeType = userLike ? LIKE_TYPE_CANCEL : LIKE_TYPE_UP;
      postLike({
        id: this.id,
        data: {
          argument_id: argumentId,
          like_type: likeType
        }
      }).then(resp => {
        let argumentListCopy = Array.from(argumentList);
        for (let argument of argumentListCopy) {
          if (argument.id === argumentId) {
            argument.like_count = resp.like_count;

            if (likeType === LIKE_TYPE_UP) {
              argument.user_like = true;
            } else {
              argument.user_like = false;
            }
            break;
          }
        }
        updateTopicArguments(argumentListCopy);
      });
    }
  };

  render() {
    const { user, topic, argumentList } = this.props;

    if (topic) {
      return (
        <div>
          <Topic topic={topic} onPostVote={this.handlePostVote} />
          <Arguments
            argumentList={argumentList}
            onPostLike={this.handlePostLike}
          />
          {user && (
            <ArgumentForm
              user={user}
              viewpoints={topic.viewpoints}
              onSubmit={this.handlePostArgument}
            />
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  topic: state.topic.topic,
  argumentList: state.topic.arguments,
  isPendingPostVote: state.topic.isPendingPostVote,
  isPendingPostLike: state.topic.isPendingPostLike
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTopic,
      fetchTopicArguments,
      createTopicArgument,
      postVote,
      updateTopic,
      postLike,
      updateTopicArguments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
