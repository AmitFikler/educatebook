import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../styles/loginPage.css';
import { Link } from 'react-router-dom';
function LoginPage() {
  return (
    <Grid spacing={3}>
      <Paper className="loginPaper" elevation={10}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: '#368bff' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField
          label="Username"
          variant="standard"
          placeholder="Enter username"
          fullWidth
          style={{ margin: '8px 0' }}
          required
        />
        <TextField
          label="Password"
          style={{ margin: '8px 0' }}
          variant="standard"
          placeholder="Enter password"
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
          Sign in
        </Button>
        <div>
          Don't have an account yet?{'  '}
          <Link to="/signup">Sign Up</Link>
        </div>
      </Paper>
    </Grid>
  );
}

export default LoginPage;
