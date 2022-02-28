import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../../styles/signUpPage.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUpPage() {
  /********* STATES *********/
  const [email, setEmail] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [role, setRole] = useState<'student' | 'tutor' | undefined>();

  /********* NAVIGATE *********/
  const navigate = useNavigate();

  /********* Sign-Up *********/
  const handleSignUp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/user`, {
        fullName,
        email,
        password,
        role,
      });
      navigate('/login');
      toast('Sign up successfully', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response.data.error, {
        type: 'error',
      });
    }
  };
  return (
    <Grid>
      <Paper className="signUpPaper" elevation={10}>
        <Grid className="signUpHeader">
          <Avatar style={{ backgroundColor: '#368bff' }}>
            <AddCircleIcon />
          </Avatar>
          <h2>Sign up</h2>
        </Grid>
        <Typography variant="caption">
          Please fill this form to create an account
        </Typography>
        <TextField
          label="Full Name"
          variant="standard"
          type="text"
          placeholder="Enter your full name"
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          style={{ margin: '8px 0' }}
          required
        />
        <TextField
          label="Email"
          variant="standard"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ margin: '8px 0' }}
          required
        />
        <FormControl
          component="fieldset"
          style={{ marginTop: '5px' }}
          onChange={(e: any) => setRole(e.target.value)} //TODO -type any
        >
          <FormLabel component="legend" required>
            Role
          </FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            style={{ display: 'initial' }}
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel value="tutor" control={<Radio />} label="Tutor" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Password"
          style={{ margin: '8px 0' }}
          variant="standard"
          placeholder="Enter password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          style={{ margin: '8px 0' }}
          onClick={() => handleSignUp()}
        >
          Sign Up
        </Button>
        <div>
          Already have an account?{'  '}
          <Link to="/login">Sign In</Link>
        </div>
      </Paper>
    </Grid>
  );
}

export default SignUpPage;
