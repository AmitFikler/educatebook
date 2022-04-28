import { Button, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
function ShareComment({
  shareAComment,
  postId,
}: {
  shareAComment: (commentOn: string, content: string) => void;
  postId: string;
}) {
  const [content, setContent] = useState<string | undefined>(undefined);
  return (
    <Paper
      style={{
        marginRight: '20%',
        display: 'flex',
      }}>
      <TextField
        id='filled-multiline-static'
        label='Share a comment..'
        multiline
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant='filled'
        style={{ width: '90%' }}
      />
      <Button
        onClick={() => {
          content && shareAComment(postId, content);
          setContent('');
        }}
        style={{ width: '10%' }}
        variant='contained'
        endIcon={<SendIcon />}>
        Send
      </Button>
    </Paper>
  );
}

export default ShareComment;
