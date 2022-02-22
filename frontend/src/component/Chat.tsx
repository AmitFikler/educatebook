import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

function Chat() {
  const [message, setMessage] = useState('');
  const socketRef = useRef<Socket>(); // useRef is a hook that lets you store a ref to a DOM element or object that has not yet been rendered.
  useEffect(() => {
    socketRef.current = io('http://localhost:3003');
    if (socketRef.current) {
      socketRef.current.on('connect', () => {
        console.log(socketRef.current!.id); // x8WIv7-mJelg7on_ALbx
      });
      socketRef.current.on('replayMessage', (message) => {
        console.log(message);
      });
    }
  }, []);

  const handleClick = () => {
    socketRef.current!.emit('message', message);
    setMessage('');
  };
  return (
    <div>
      <h1>Chat</h1>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default Chat;
