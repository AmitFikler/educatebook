import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { Message } from '../../@types/@types';
import SendIcon from '@mui/icons-material/Send';

function ChatContainer({
  roomParam,
  chat,
  handleClick,
  setMessage,
  message,
}: {
  roomParam: string | undefined;
  chat: Message[];
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setMessage: (message: string) => void;
  message: string;
}) {
  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography className="chatHeader" variant="h3" gutterBottom>
              {roomParam}
            </Typography>
            <Divider />

            <Grid
              container
              className="chatContainer"
              spacing={4}
              alignItems="center"
              style={{
                height: '53vh',
                overflowY: 'auto',
                margin: '0 auto',
                width: '100%',
              }}
            >
              <Grid
                id="chat"
                item
                xs={12}
                style={{ padding: '0px', height: '100%' }}
              >
                <List>
                  {chat.map((message) => (
                    <ListItem key={message._id}>
                      <ListItemText
                        primary={`${message.username}: ${message.message}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
          <form className="sendMessage">
            <TextField
              id="filled-basic"
              label="Message"
              placeholder="Type your message here"
              variant="outlined"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '85%' }}
            />
            <Button
              type="submit"
              onClick={handleClick}
              variant="contained"
              endIcon={<SendIcon />}
              style={{ width: '15%' }}
            >
              Send
            </Button>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default ChatContainer;
