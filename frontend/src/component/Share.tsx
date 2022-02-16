import { Button, Paper, TextField } from '@mui/material';

function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <Paper style={{ padding: '10px' }}>
          <h4>Share a post</h4>
          <TextField label="Title" variant="filled" style={{ width: '100%' }} />
          <TextField
            id="filled-multiline-static"
            label="Share a post.."
            multiline
            rows={4}
            variant="filled"
            style={{ width: '100%' }}
          />
          <Button
            style={{ marginTop: '4px' }}
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default Share;
