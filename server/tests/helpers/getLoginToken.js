const userData = {
  email: 'chaulagainnabin999@gmail.com',
  username: 'admin',
  password: 'admin'
};

const login = (request) => {
  return request.post('/api/auth/login').send({
    username: userData.username,
    password: userData.password
  });
};

const signup = (request) => {
  return request.post('/api/auth/signup').send(userData);
};

const getToken = async (request) => {
  let res = await login(request);
  if (res.status !== 200) {
    res = await signup(request);
    res = await login(request);
  }
  return res.body.token;
};

module.exports = getToken;
