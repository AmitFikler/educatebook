import axios from 'axios';
import { Message } from '../../../@types/@types';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import '../../styles/Chat.css';
import TopBar from '../Bars/TopBar';
import { UserContext } from '../../contexts/User/UserContext';
import { Button } from '@mui/material';
import ChatContainer from './ChatContainer';

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Message[]>([]);
  const messageEl = useRef<HTMLUListElement | null>(null);

  const roomParam = useParams().room;
  const { user } = useContext(UserContext)!;
  const rooms = [
    'math',
    'english',
    'science',
    'history',
    'geography',
    'physics',
    'chemistry',
  ];
  const socketRef = useRef<Socket>(); // useRef is a hook that lets you store a ref to a DOM element or object that has not yet been rendered.
  useEffect(() => {
    fetchMessages(roomParam!).then((messages) => {
      setChat(messages);
    });
    socketRef.current = io('http://localhost:3003');
    if (socketRef.current) {
      socketRef.current.on('replayMessage', (message) => {
        setChat((chat) => [...chat, message]); // add new message to chat
      });
    }
  }, []);

  const fetchMessages = async (room: string) => {
    socketRef.current?.emit('join', room);
    const response = await axios.get(
      `http://localhost:3003/api/message/${room}`
    );
    return response.data;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socketRef.current!.emit('message', {
      message,
      room: roomParam,
      username: user?.fullName,
    });
    setMessage('');
  };

  const leaveRoom = () => {
    socketRef.current!.emit('leaveRoom', roomParam);
  };
  return (
    <div>
      <TopBar />
      {!roomParam && <h1 id="selectRoom">Select a room to chat:</h1>}
      <div className="roomsButtons">
        <>
          {rooms.map((room) => (
            <Link
              className="rooms"
              to={`/chat/${room}`}
              onClick={() => {
                leaveRoom();
                fetchMessages(room).then((messages) => {
                  setChat(messages);
                });
              }}
            >
              <Button
                style={{ fontSize: '17px' }}
                variant={room === roomParam ? 'contained' : 'outlined'}
              >
                {room}
              </Button>
            </Link>
          ))}
        </>
      </div>
      {roomParam && (
        <ChatContainer
          roomParam={roomParam}
          chat={chat}
          handleClick={handleClick}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default Chat;
