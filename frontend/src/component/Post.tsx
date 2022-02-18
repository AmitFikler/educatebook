import { Avatar, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from 'react';
import Comment from './Comment';
import ShareComment from './ShareComment';
import { PostType } from '../../@types/@types';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

function Post({
  post,
  shareAComment,
  handleDelete,
}: {
  post: PostType;
  shareAComment: (commentOn: string, content: string) => void;
  handleDelete: (postId: string) => Promise<void>;
}) {
  const [showComments, setShowComments] = useState<boolean>(false);
  return (
    <div className="post" id={post._id}>
      <div className="postWrapper">
        <Paper style={{ padding: '10px' }}>
          <div className="postOwner">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar>{post.usernameId.username[0].toUpperCase()}</Avatar>
              <p className="postEmail">{post.usernameId.username}</p>
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <h5>{post.usernameId.role}</h5>
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(post._id)}
              />
            </span>
          </div>
          <div className="postContent">
            <h3>{post.title}</h3>
            <p>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p>{post.content}</p>
          </div>
          <div className="postFooter">
            <div className="likes">
              {post.likes}
              {'  '}
              <ThumbUpIcon color="primary" style={{ cursor: 'pointer' }} />
            </div>
            <div className="comments">
              {post.comments.length}
              <CommentIcon
                style={{ cursor: 'pointer' }}
                color="primary"
                onClick={() =>
                  showComments ? setShowComments(false) : setShowComments(true)
                }
              />
            </div>
          </div>
        </Paper>
        {showComments ? (
          <div className="comment-container">
            {post.comments.map((comment) => (
              <Comment comment={comment} />
            ))}
            <ShareComment shareAComment={shareAComment} postId={post._id} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Post;
