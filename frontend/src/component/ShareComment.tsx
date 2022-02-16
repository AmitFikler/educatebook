import { Button, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
function ShareComment() {
  return (
    <Paper
      style={{
        marginRight: '20%',
        display: 'flex',
      }}
    >
      <TextField
        id="filled-multiline-static"
        label="Share a comment.."
        multiline
        rows={2}
        variant="filled"
        style={{ width: '90%' }}
      />
      <Button
        style={{ width: '10%' }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Paper>
  );
}

export default ShareComment;
