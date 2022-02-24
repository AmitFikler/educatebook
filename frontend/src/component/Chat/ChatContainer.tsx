import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Message } from '../../../@types/@types';
import MessageGroup from './MessageGroup';
import SendMessageForm from './SendMessageForm';

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
            <MessageGroup chat={chat} />
          </Box>
          <SendMessageForm
            message={message}
            setMessage={setMessage}
            handleClick={handleClick}
          />
        </Paper>
      </Container>
    </Fragment>
  );
}

export default ChatContainer;
