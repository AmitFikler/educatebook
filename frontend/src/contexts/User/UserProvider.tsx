// Context
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../../@types/@types';
import { getToken } from '../../helpers/tokenHelper';
import { UserContext } from './UserContext';
// Types

function UserProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  const [user, setUser] = useState<UserType | null>(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserFromToken().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const getUserFromToken = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login'); // redirect to login page
      return;
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/api/user/userFromToken`,
      {
        headers: {
          authorization: getToken()!,
        },
      }
    );
    return data;
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
