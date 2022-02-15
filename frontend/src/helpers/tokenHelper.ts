const setToken = (token: string) => {
  return localStorage.setItem('jwt', `Bearer ${token}`);
};

const getToken = () => {
  return localStorage.getItem('jwt');
};

const removeToken = () => {
  return localStorage.removeItem('jwt');
};
export { setToken, getToken, removeToken };
