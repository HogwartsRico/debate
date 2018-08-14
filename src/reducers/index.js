import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth';
import { topicReducer } from './topic';

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  auth: authReducer,
  topic: topicReducer
});
