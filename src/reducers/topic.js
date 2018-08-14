import {
  GET_TOPIC_LIST,
  GET_TOPIC,
  GET_TOPIC_ARGUMENTS,
  CREATE_TOPIC,
  CREATE_TOPIC_ARGUMENT,
  POST_VOTE,
  POST_LIKE
} from '../constants/types';

const initialState = {
  isPendingTopicList: false,
  isPendingTopic: false,
  isPendingTopicArguments: false,
  isPendingCreateTopic: false,
  isPendingCreateTopicArgument: false,
  isPendingPostVote: false,
  isPendingPostLike: false,
  q: '',
  topicList: [],
  topic: null,
  viewpoints: [],
  arguments: []
};

export const topicReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TOPIC_LIST.PENDING:
      return {
        ...state,
        isPendingTopicList: true
      };
    case GET_TOPIC_LIST.SUCCESS:
      return {
        ...state,
        isPendingTopicList: false,
        topicList: action.payload
      };
    case GET_TOPIC_LIST.ERROR:
      return {
        ...state,
        isPendingTopicList: false
      };
    case GET_TOPIC.PENDING:
      return {
        ...state,
        isPendingTopic: true,
        topic: null,
        viewpoints: []
      };
    case GET_TOPIC.SUCCESS:
      return {
        ...state,
        isPendingTopic: false,
        topic: action.payload,
        viewpoints: action.payload.viewpoints
      };
    case GET_TOPIC.ERROR:
      return {
        ...state,
        isPendingTopic: false
      };
    case GET_TOPIC_ARGUMENTS.PENDING:
      return {
        ...state,
        isPendingTopicArguments: true
      };
    case GET_TOPIC_ARGUMENTS.SUCCESS:
      return {
        ...state,
        isPendingTopicArguments: false,
        arguments: action.payload
      };
    case GET_TOPIC_ARGUMENTS.ERROR:
      return {
        ...state,
        isPendingTopicArguments: false
      };
    case CREATE_TOPIC.PENDING:
      return {
        ...state,
        isPendingCreateTopic: true
      };
    case CREATE_TOPIC.SUCCESS:
      return {
        ...state,
        isPendingCreateTopic: false
      };
    case CREATE_TOPIC_ARGUMENT.PENDING:
      return {
        ...state,
        isPendingCreateTopicArgument: true
      };
    case CREATE_TOPIC_ARGUMENT.SUCCESS:
      return {
        ...state,
        isPendingCreateTopicArgument: false
      };
    case POST_VOTE.PENDING:
      return {
        ...state,
        isPendingPostVote: true
      };
    case POST_VOTE.SUCCESS:
      return {
        ...state,
        isPendingPostVote: false
      };
    case POST_VOTE.ERROR:
      return {
        ...state,
        isPendingPostVote: false
      };
    case POST_LIKE.PENDING:
      return {
        ...state,
        isPendingPostLike: true
      };
    case POST_LIKE.SUCCESS:
      return {
        ...state,
        isPendingPostLike: false
      };
    case POST_LIKE.ERROR:
      return {
        ...state,
        isPendingPostLike: false
      };
    default:
      return state;
  }
};
