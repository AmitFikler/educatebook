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
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../styles/signUpPage.css';
import Logo from './Logo';

function SignUpPage() {
  return (
    <Grid>
      <Paper className="signUpPaper" elevation={20}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: '#368bff' }}>
            <AddCircleIcon />
          </Avatar>
          <h2 className="headerSignUp">Sign up</h2>
        </Grid>
        <Typography variant="caption">
          Please fill this form to create an account
        </Typography>
        <TextField
          label="Email"
          variant="standard"
          type="email"
          placeholder="Enter email"
          fullWidth
          style={{ margin: '8px 0' }}
          required
        />
        <FormControl component="fieldset" style={{ marginTop: '5px' }}>
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
          type="password"
          required
        />
        <TextField
          label="Confirm Password"
          style={{ margin: '8px 0' }}
          variant="standard"
          placeholder="Confirm Password"
          fullWidth
          type="password"
          required
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          style={{ margin: '8px 0' }}
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
