import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import IconText from './IconText';
import { formatTime } from '../utils';

function TopicList({ items }) {
  return (
    <div className="b-topic-list">
      {items.map((item, i) => (
        <Card className="topic-item" key={i}>
          <div className="item-content">
            <Link to={`/topic/${item.id}`}>
              <h3 className="title">{item.title}</h3>
            </Link>
            <ul className="topic-item-footer">
              <li>
                <span className="item">{item.point_count}次浏览</span>
                <em className="ant-list-item-action-split" />
              </li>
              <li>
                <Link to={`/topic/${item.id}`} className="item">
                  <IconText
                    type="message"
                    text={`${item.arguments_count}条论述`}
                  />
                  <em className="ant-list-item-action-split" />
                </Link>
              </li>
              <li>
                <span className="item">
                  {formatTime(new Date(item.created_at))}
                </span>
              </li>
            </ul>
          </div>
          <div className="votes">
            {item.viewpoints.map((viewpoint, index) => (
              <span key={index} className={index ? 'con' : 'pro'}>
                {viewpoint.votes_count}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

TopicList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      viewpoints: PropTypes.arrayOf(
        PropTypes.shape({
          votes_count: PropTypes.number.isRequired,
          content: PropTypes.string.isRequired
        })
      ),
      arguments_count: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired
    })
  )
};

export default TopicList;
