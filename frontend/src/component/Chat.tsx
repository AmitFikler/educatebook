import axios from 'axios';
import { Message } from '../../@types/@types';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import '../styles/Chat.css';
import TopBar from './TopBar';
import { UserContext } from '../UserContext';

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Message[]>([]);
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
  console.log(chat);
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
    const response = await axios.get(
      `http://localhost:3003/api/message/${room}`
    );
    return response.data;
  };

  const handleClick = () => {
    console.log(message, roomParam, user?.username);
    socketRef.current!.emit('message', {
      message,
      room: roomParam,
      username: user?.username,
    });
    setMessage('');
  };
  return (
    <div>
      <TopBar />
      <div className="chat-container">
        <nav className="rooms">
          {rooms.map((room) => (
            <Link
              onClick={() => {
                fetchMessages(room).then((messages) => {
                  setChat(messages);
                });
              }}
              to={`/chat/${room}`}
              key={room}
              className={roomParam === room ? 'selected' : ''}
            >
              {room}
            </Link>
          ))}
        </nav>
        <div className="chat-box">
          <div className="chat-messages">
            {chat.map((message) => (
              <div className="message" key={message._id}>
                <div className="message-text">{message.message}</div>
              </div>
            ))}
            <div className="chatInput">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleClick} disabled={message.length === 0}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
