const setToken = (token: string) => {
  localStorage.setItem('jwt', `Bearer ${token}`);
};

const getToken = () => {
  return localStorage.getItem('jwt');
};

const removeToken = () => {
  localStorage.removeItem('jwt');
};
export { setToken, getToken, removeToken };
