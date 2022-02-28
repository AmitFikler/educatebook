import { Avatar, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import { useContext, useState } from 'react';
import Comment from './Comment';
import ShareComment from './ShareComment';
import { PostType } from '../../../@types/@types';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { UserContext } from '../../contexts/User/UserContext';

function Post({
  post,
  shareAComment,
  handleDelete,
  handleLike,
}: {
  post: PostType;
  shareAComment: (commentOn: string, content: string) => void;
  handleDelete: (postId: string) => Promise<void>;
  handleLike: (
    postId: string,
    likes: number,
    type: 'like' | 'unlike'
  ) => Promise<void>;
}) {
  const value = useContext(UserContext);

  const [showComments, setShowComments] = useState<boolean>(false);
  return (
    <div className="post" id={post._id}>
      <div className="postWrapper">
        <Paper style={{ padding: '10px' }}>
          <div className="postOwner">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {post.usernameId.picture ? (
                <Avatar src={`${post.usernameId.picture}`} />
              ) : (
                <Avatar>{post.usernameId.fullName[0].toUpperCase()}</Avatar>
              )}
              <p className="postEmail">{post.usernameId.fullName}</p>
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <h5>{post.usernameId.role}</h5>
              {value?.user?.posts.includes(post._id) && (
                <DeleteIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(post._id)}
                />
              )}
            </span>
          </div>
          <div className="postContent">
            <h3>{post.title}</h3>
            <p>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p>{post.content}</p>
          </div>
          <div className="postFooter">
            <div className="likes">
              {value?.user?.likes.includes(post._id) ? (
                <ThumbUpIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleLike(post._id, post.likes - 1, 'unlike')}
                  color="primary"
                />
              ) : (
                <ThumbUpOutlinedIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleLike(post._id, post.likes + 1, 'like')}
                  color="primary"
                />
              )}
              {post.likes}
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
            {post.comments.map((comment, i) => (
              <Comment key={i} comment={comment} />
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
