import { Avatar, Paper } from '@mui/material';
import { useContext } from 'react';
import { CommentType } from '../../../@types/@types';
import { UserContext } from '../../contexts/User/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';

function Comment({ comment }: { comment: CommentType }) {
  const { user } = useContext(UserContext)!;
  console.log(comment);
  console.log(user);
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
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <p>12/2/2022 16:50</p>
              {user!.comments.includes(comment._id) && (
                <DeleteIcon style={{ cursor: 'pointer' }} />
              )}
            </span>
          </div>
          <p>{comment.content}</p>
        </Paper>
      </div>
    </div>
  );
}

export default Comment;
