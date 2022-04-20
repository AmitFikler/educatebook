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
import { ReactComponent as Spinner } from '../../images/spinner.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function SignUpPage() {
  /********* STATES *********/
  const [email, setEmail] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [role, setRole] = useState<'student' | 'tutor' | undefined>();
  const [picture, setPicture] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /********* NAVIGATE *********/
  const navigate = useNavigate();

  /********* Sign-Up *********/
  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/user`, {
        fullName,
        email,
        password,
        role,
        picture,
      });
      setIsLoading(false);
      navigate('/login');
      toast('Sign up successfully', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response.data.error, {
        type: 'error',
      });
      setIsLoading(false);
    }
  };

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      const reader = new FileReader();
      if (file) {
        reader.onload = () => {
          setPicture(reader.result);
        };
      }
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              <FormControlLabel
                value="tutor"
                control={<Radio />}
                label="Tutor"
              />
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
          <div className="upload-img">
            <Button variant="contained" component="label">
              <AddPhotoAlternateIcon /> Upload Profile Picture
              <input
                type="file"
                hidden
                name="img"
                accept="image/*"
                onChange={imageHandler}
              />
            </Button>
            {picture && (
              <img
                src={`${picture}`}
                alt="profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  margin: '8px 0',
                }}
              />
            )}
          </div>
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
          {isLoading && <Spinner />}
        </Paper>
      </Grid>
    </>
  );
}

export default SignUpPage;
