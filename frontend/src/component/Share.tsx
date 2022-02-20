import { Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';

interface props {
  shareNewPost: (title: string, content: string) => void;
}
function Share({ shareNewPost }: props) {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);

  return (
    <div className="share">
      <div className="shareWrapper">
        <Paper style={{ padding: '10px' }}>
          <h4>Share a post</h4>
          <TextField
            label="Title"
            variant="filled"
            style={{ width: '100%' }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            onChange={(e) => setContent(e.target.value)}
            id="filled-multiline-static"
            label="Share a post.."
            multiline
            rows={4}
            variant="filled"
            style={{ width: '100%' }}
          />
          <Button
            onClick={() =>
              title && content ? shareNewPost(title, content) : null
            }
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
