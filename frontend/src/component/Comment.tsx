import { Avatar, Paper } from '@mui/material';
import { CommentType } from '../../@types/@types';

function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="comment">
      <div className="commentWrapper">
        <Paper
          style={{
            padding: '10px',
            marginRight: '20%',
          }}
        >
          <div className="postOwner">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar>{comment.usernameId.username[0].toUpperCase()}</Avatar>
              <p className="postEmail">{comment.usernameId.username}</p>
              <h5> | {comment.usernameId.role}</h5>
            </span>
            <p>12/2/2022 16:50</p>
          </div>
          <p>{comment.content}</p>
        </Paper>
      </div>
    </div>
  );
}

export default Comment;
