import { Button, Paper, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HideImageIcon from '@mui/icons-material/HideImage';

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

  const submitHandler = () => {
    if (title && content) {
      shareNewPost(title, content, picture);
    }
    setTitle('');
    setContent('');
    setPicture(null);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            onChange={(e) => setContent(e.target.value)}
            id="filled-multiline-static"
            label="Share a post.."
            multiline
            rows={4}
            variant="filled"
            value={content}
            style={{ width: '100%' }}
          />
          {picture && (
            <img src={`${picture}`} alt="post" className="postImagePreview" />
          )}
          <div className="share-buttons">
            <div>
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
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<HideImageIcon />}
                  onClick={() => setPicture(null)}
                >
                  Remove Image
                </Button>
              )}
            </div>
            <Button
              onClick={() => (title && content ? submitHandler() : null)}
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
