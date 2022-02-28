import { Button, Paper, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { useState } from 'react';

interface props {
  shareNewPost: (
    title: string,
    content: string,
    picture: string | ArrayBuffer | null
  ) => void;
}
function Share({ shareNewPost }: props) {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [picture, setPicture] = useState<string | ArrayBuffer | null>(null);

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
          <div className="share-buttons">
            <Button
              startIcon={<AddPhotoAlternateIcon />}
              variant="contained"
              component="label"
            >
              Image
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
                alt="post"
                style={{ width: '30vw', height: 'auto' }}
              />
            )}
            <Button
              onClick={() =>
                title && content ? shareNewPost(title, content, picture) : null
              }
              style={{ marginTop: '4px' }}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Share;
