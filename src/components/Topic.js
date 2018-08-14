import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Progress, Tag } from 'antd';
import IconText from './IconText';
import { formatTime } from '../utils';
import { BLUE_COLOR, RED_COLOR } from '../constants/keys';

function Topic({ topic, onPostVote }) {
  return (
    <div className="b-topic border ant-list-vertical">
      <div className="title has-text-centered">{topic.title}</div>
      <p className="description">{topic.description}</p>
      <ul className="level is-mobile viewpoints">
        {topic.viewpoints.map((viewpoint, i) => (
          <div key={i} className={i ? 'con level-right' : 'pro level-left'}>
            {viewpoint.content}
          </div>
        ))}
      </ul>
      {!topic.viewpoints[0].votes_count && !topic.viewpoints[1].votes_count ? (
        <Progress percent={0} showInfo={false} />
      ) : (
        <Progress
          className="viewpoints-progress"
          percent={
            (topic.viewpoints[0].votes_count /
              (topic.viewpoints[0].votes_count +
                topic.viewpoints[1].votes_count)) *
            100
          }
          showInfo={false}
        />
      )}
      <ul className="level is-mobile viewpoints-votes">
        {topic.viewpoints.map((viewpoint, i) => (
          <Tag
            key={i}
            color={
              topic.user_vote_viewpoint_id === viewpoint.id
                ? i
                  ? RED_COLOR
                  : BLUE_COLOR
                : i
                  ? 'red'
                  : 'geekblue'
            }
            onClick={() => onPostVote(viewpoint.id)}
          >
            <IconText type="up" text={viewpoint.votes_count} />
          </Tag>
        ))}
      </ul>
      <div className="level is-mobile topic-footer">
        <div className="level-left">
          <div className="level-item">
            <Link to={`/user/${topic.user.uid}`} className="author">
              {topic.user.username}
            </Link>
            <span className="divider">创建于</span>
            <span>
              {formatTime(new Date(topic.created_at), 'y-m-d h:i', true)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Topic.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    viewpoints: PropTypes.arrayOf(
      PropTypes.shape({
        side: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        votes_count: PropTypes.number.isRequired
      })
    ).isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
    user_vote_viewpoint_id: PropTypes.number
  }),
  onPostVote: PropTypes.func.isRequired
};

export default Topic;
