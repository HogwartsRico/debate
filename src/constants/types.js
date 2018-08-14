import { createActionSet } from '../utils';

export const AUTH_USER = 'AUTH_USER';
export const LOGOUT = 'LOGOUT';
export const GET_AUTH_USER = createActionSet('GET_AUTH_USER');

export const GET_TOPIC_LIST = createActionSet('GET_HOT_TOPIC_LIST');
export const CREATE_TOPIC = createActionSet('CREATE_TOPIC');
export const GET_TOPIC = createActionSet('GET_TOPIC');
export const GET_TOPIC_ARGUMENTS = createActionSet('GET_TOPIC_ARGUMENTS');
export const CREATE_TOPIC_ARGUMENT = createActionSet('CREATE_TOPIC_ARGUMENT');
export const POST_VOTE = createActionSet('POST_VOTE');
export const POST_LIKE = createActionSet('POST_LIKE');
