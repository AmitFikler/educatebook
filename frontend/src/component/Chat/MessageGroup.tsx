import { Avatar, Grid, List, ListItemText } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import { Message } from '../../../@types/@types';
import { UserContext } from '../../contexts/User/UserContext';
import moment from 'moment';

function MessageGroup({ chat }: { chat: Message[] }) {
  const { user } = useContext(UserContext)!;
  console.log(chat);
  const messageEl = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (messageEl.current !== null) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        messageEl.current!.scroll({
          top: messageEl.current!.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  return (
    <Grid container className="chatContainer" spacing={4} alignItems="center">
      <Grid id="chat" item xs={12}>
        <List className="messages" ref={messageEl}>
          {chat.map((message) => (
            <li
              key={message._id}
              className={`msg ${
                message.username === user!.fullName ? 'userMsg' : 'diffMsg'
              }`}
            >
              <div>
                <h3> {message.username} </h3>
                <ListItemText primary={`${message.message}`} />
                <p
                  className={
                    message.username === user!.fullName ? 'myTime' : 'yourTime'
                  }
                >
                  {moment(message.createdAt).format('DD/MM/YY, hh:mm:ss a')}
                </p>
              </div>
            </li>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
export default MessageGroup;
