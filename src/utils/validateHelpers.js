export const validateMobile = (rule, mobile, callback) => {
  if (!mobile || !mobile.length) {
    return callback('手机号 为必填项.');
  }

  if (!mobile.match(/^((1[3-8][0-9])+\d{8})$/)) {
    return callback('手机号 必须是合法手机号格式.');
  }
  callback();
};

export const validatePassword = (rule, password, callback) => {
  if (!password || !password.length) {
    return callback('密码 为必填项.');
  }

  if (password.length < 6) {
    return callback('密码 长度不能少于6位.');
  }
  callback();
};

export const validateUsername = (rule, username, callback) => {
  if (!username || !username.length) {
    return callback('用户名 为必填项.');
  }

  if (username.length < 3 || username.length > 20) {
    return callback('用户名 必须为3到20个字符长度');
  }
  callback();
};

export const validateTopicTitle = (rule, title, callback) => {
  if (!title || !title.length) {
    return callback('辩题 为必填项.');
  }
  callback();
};

export const validateViewpoint = (rule, opinion, callback) => {
  if (!opinion || !opinion.length) {
    return callback('观点 为必填项.');
  }
  callback();
};

export const validateVerificationCode = (rule, verificationCode, callback) => {
  if (!verificationCode || !verificationCode.length) {
    return callback('手机验证码 为必填项.');
  }

  callback();
};
