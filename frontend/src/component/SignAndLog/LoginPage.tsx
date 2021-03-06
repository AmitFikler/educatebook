import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../../styles/loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { setToken } from '../../helpers/tokenHelper';
import { UserContext } from '../../contexts/User/UserContext';
import { toast } from 'react-toastify';

function LoginPage() {
  const { setUser } = useContext(UserContext)!;

  /********* STATES *********/
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  /********* NAVIGATE *********/
  const navigate = useNavigate();

  /********* Sign-In *********/
  const handleSignIn = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/login`,
        {
          email,
          password,
        }
      );
      // setUser(data.user);
      setToken(data.token);
      setUser(data.user);
      toast('Sign in successfully', {
        type: 'success',
      });
      navigate('/');
    } catch (error: any) {
      toast(error.response.data.error, {
        type: 'error',
      });
    }
  };
  return (
    <Grid>
      <Paper className='loginPaper' elevation={10}>
        <Grid className='loginHeader'>
          <Avatar style={{ backgroundColor: '#368bff' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField
          label='Email'
          variant='standard'
          placeholder='Enter email'
          fullWidth
          style={{ margin: '8px 0' }}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label='Password'
          style={{ margin: '8px 0' }}
          variant='standard'
          placeholder='Enter password'
          fullWidth
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type='submit'
          color='primary'
          fullWidth
          variant='contained'
          style={{ margin: '8px 0' }}
          onClick={() => handleSignIn()}>
          Sign in
        </Button>
        <div>
          Don't have an account yet?{'  '}
          <Link to='/signup'>Sign Up</Link>
        </div>
      </Paper>
    </Grid>
  );
}

export default LoginPage;
