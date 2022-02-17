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
              <Avatar>A</Avatar>
              <p className="postEmail">amitfikler@gmail.com</p>
              <h5>-Tutor</h5>
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
