import api from '../services/api';
import {
  GET_TOPIC_LIST,
  GET_TOPIC,
  GET_TOPIC_ARGUMENTS,
  CREATE_TOPIC,
  CREATE_TOPIC_ARGUMENT,
  POST_VOTE,
  POST_LIKE
} from '../constants/types';

export const fetchTopicList = hot => {
  return dispatch => {
    dispatch({
      type: GET_TOPIC_LIST.PENDING
    });
    return api.fetchTopicList(hot).then(response => {
      dispatch({
        type: GET_TOPIC_LIST.SUCCESS,
        payload: response
      });
    });
  };
};

export const fetchTopic = id => {
  return dispatch => {
    dispatch({ type: GET_TOPIC.PENDING });
    return api.fetchTopic(id).then(response => {
      dispatch({
        type: GET_TOPIC.SUCCESS,
        payload: response
      });
      return response;
    });
  };
};

export const fetchTopicArguments = id => {
  return dispatch => {
    dispatch({ type: GET_TOPIC_ARGUMENTS.PENDING });
    return api.fetchTopicArguments(id).then(response => {
      dispatch({
        type: GET_TOPIC_ARGUMENTS.SUCCESS,
        payload: response
      });
    });
  };
};

export const createTopic = data => {
  return dispatch => {
    dispatch({ type: CREATE_TOPIC.PENDING });
    return api.createTopic(data).then(response => {
      dispatch({
        type: CREATE_TOPIC.SUCCESS,
        payload: response
      });
    });
  };
};

export const createTopicArgument = ({ id, data }) => {
  return dispatch => {
    dispatch({ type: CREATE_TOPIC_ARGUMENT.PENDING });
    return api.createArgument(id, data).then(response => {
      dispatch({ type: CREATE_TOPIC_ARGUMENT.SUCCESS });
    });
  };
};

export const postVote = ({ id, data }) => {
  return dispatch => {
    dispatch({ type: POST_VOTE.PENDING });
    return api.postVote(id, data).then(response => {
      dispatch({ type: POST_VOTE.SUCCESS });
      return response;
    });
  };
};

export const updateTopic = data => {
  return dispatch => {
    dispatch({ type: GET_TOPIC.SUCCESS, payload: data });
  };
};

export const postLike = ({ id, data }) => {
  return dispatch => {
    dispatch({ type: POST_LIKE.PENDING });
    return api.postLike(id, data).then(response => {
      dispatch({ type: POST_LIKE.SUCCESS });
      return response;
    });
  };
};

export const updateTopicArguments = data => {
  return dispatch => {
    dispatch({
      type: GET_TOPIC_ARGUMENTS.SUCCESS,
      payload: data
    });
  };
};
