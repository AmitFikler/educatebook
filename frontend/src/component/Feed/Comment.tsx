import { Avatar, Paper } from '@mui/material';
import { useContext } from 'react';
import { CommentType } from '../../../@types/@types';
import { UserContext } from '../../contexts/User/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

function Comment({ comment }: { comment: CommentType }) {
  const { user } = useContext(UserContext)!;
  return (
    <div className='comment'>
      <div className='commentWrapper'>
        <Paper
          style={{
            padding: '10px',
            marginRight: '20%',
          }}>
          <div className='postOwner'>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {comment.usernameId.picture ? (
                <Avatar src={`${comment.usernameId.picture}`} />
              ) : (
                <Avatar>{comment.usernameId.fullName[0].toUpperCase()}</Avatar>
              )}
              <p className='postEmail'>{comment.usernameId.fullName}</p>
              <h5> | {comment.usernameId.role}</h5>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <p>
                  {moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
              </span>
            </span>
          </div>
          <p>{comment.content}</p>
        </Paper>
      </div>
    </div>
  );
}

export default Comment;
