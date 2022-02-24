import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function SendMessageForm({
  message,
  setMessage,
  handleClick,
}: {
  message: string;
  setMessage: (message: string) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <form className="sendMessage">
      <TextField
        className="typeMessage"
        label="Message"
        placeholder="Type your message here"
        variant="outlined"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        type="submit"
        disabled={message.length === 0}
        className="sendMessageBtn"
        onClick={handleClick}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </form>
  );
}

export default SendMessageForm;
