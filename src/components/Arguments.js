import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Avatar, Tag } from 'antd';
import IconText from './IconText';
import { formatTime } from '../utils';
import { VIEWPOINT_PRO, BLUE_COLOR, RED_COLOR } from '../constants/keys';

function Arguments({ argumentList, onPostLike }) {
  return (
    <div className="b-arguments border">
      <List
        itemLayout="vertical"
        header={<span>{argumentList.length}条论述</span>}
        dataSource={argumentList}
        locale={{ emptyText: '暂无论述' }}
        renderItem={(item, i) => (
          <List.Item
            className="argument-item"
            actions={[
              <IconText
                type={item.user_like ? 'like' : 'like-o'}
                text={item.like_count}
                color={
                  item.user_like
                    ? item.viewpoint.side === VIEWPOINT_PRO
                      ? BLUE_COLOR
                      : RED_COLOR
                    : null
                }
                onClick={() => onPostLike(item.id, item.user_like)}
              />
            ]}
          >
            <List.Item.Meta
              title={
                <ul className="ant-list-item-action">
                  <li className="author">
                    <Link to={`/user/${item.user.uid}`}>
                      <Avatar
                        className="avatar"
                        size="small"
                        src={item.user.avatar}
                      />
                      <span className="username">{item.user.username}</span>
                    </Link>
                  </li>
                  <li className="viewpoint">
                    <Tag
                      color={
                        item.viewpoint.side === VIEWPOINT_PRO
                          ? BLUE_COLOR
                          : RED_COLOR
                      }
                    >
                      {item.viewpoint.content}
                    </Tag>
                    <span>#{i + 1}</span>
                  </li>
                </ul>
              }
              description={
                <div className="content">
                  <p>{item.content}</p>
                  <span className="time">
                    {formatTime(new Date(item.created_at))}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

Arguments.protoTypes = {
  argumentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      like_count: PropTypes.number.isRequired,
      user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
      }),
      viewpoint: PropTypes.shape({
        side: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired
      }),
      created_at: PropTypes.string.isRequired
    })
  ),
  onPostLike: PropTypes.func.isRequired
};

export default Arguments;
