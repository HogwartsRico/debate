import 'isomorphic-fetch';
import { headers } from '../constants/config';
import store from '../store';
import { logout } from '../actions/auth';

const API_ROOT = process.env.REACT_APP_API_ROOT;
const UPLOAD_URL = 'http://upload.qiniup.com';

function callApi(endpoint, request) {
  if (request && request.body) request.body = JSON.stringify(request.body);

  const token = store.getState().auth.token;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const requestWithHeaders = {
    ...{ headers },
    ...request
  };
  let url = endpoint;
  if (url.startsWith('/')) {
    url = API_ROOT + endpoint;
  }

  return fetch(url, requestWithHeaders)
    .then(response => response.json())
    .then(body => {
      if (body.code === 0) {
        return body.data;
      } else {
        if (body.code === 2) {
          store.dispatch(logout());
        }
        return Promise.reject(body.message);
      }
    });
}

function uploadFile(formData) {
  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  }).then(response => response.json());
}

export default {
  login(data) {
    return callApi('/login', {
      method: 'POST',
      body: data
    });
  },
  register(data) {
    return callApi('/register', {
      method: 'POST',
      body: data
    });
  },
  getCaptcha(data) {
    return callApi('/captcha', {
      method: 'POST',
      body: data
    });
  },
  sendVerificationCode(data) {
    return callApi('/verification_code', {
      method: 'POST',
      body: data
    });
  },
  getUser() {
    return callApi('/user', {
      method: 'GET'
    });
  },
  fetchUserProfile(uid) {
    return callApi(`/users/${uid}/profile`, {
      method: 'GET'
    });
  },
  updateProfile(data) {
    return callApi('/profile', {
      method: 'PUT',
      body: data
    });
  },
  fetchQiniuUploadToken() {
    return callApi('/qiniu_token', {
      method: 'GET'
    });
  },
  fetchUserTopics(uid) {
    return callApi(`/users/${uid}/topics`);
  },
  fetchUserArguments(uid) {
    return callApi(`/users/${uid}/arguments`);
  },
  putNewPassword(data) {
    return callApi('/password', {
      method: 'PUT',
      body: data
    });
  },
  updateUser(data) {
    return callApi('/user', {
      method: 'PATCH',
      body: data
    });
  },
  qiniuUpload(data) {
    return uploadFile(data);
  },
  createTopic(data) {
    return callApi('/topics/', {
      method: 'POST',
      body: data
    });
  },
  fetchTopicList(isHot) {
    let uri = '/topics';
    if (isHot) {
      uri = `${uri}?type=hot`;
    }
    return callApi(uri, {
      method: 'GET'
    });
  },
  fetchTopic(id) {
    return callApi(`/topics/${id}`, {
      method: 'GET'
    });
  },
  fetchTopicArguments(topicId) {
    return callApi(`/topics/${topicId}/arguments`, {
      method: 'GET'
    });
  },
  createArgument(id, data) {
    return callApi(`/topics/${id}/arguments`, {
      method: 'POST',
      body: data
    });
  },
  postVote(id, data) {
    return callApi(`/topics/${id}/votes`, {
      method: 'POST',
      body: data
    });
  },
  postLike(id, data) {
    return callApi(`/topics/${id}/likes`, {
      method: 'POST',
      body: data
    });
  }
};
