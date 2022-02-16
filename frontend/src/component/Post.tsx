import { Avatar, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from 'react';
import Comment from './Comment';
import ShareComment from './ShareComment';

function Post() {
  const [showComments, setShowComments] = useState<boolean>(false);
  return (
    <div className="post">
      <div className="postWrapper">
        <Paper style={{ padding: '10px' }}>
          <div className="postOwner">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar>A</Avatar>
              <p className="postEmail">amitfikler@gmail.com</p>
            </span>
            <h5>Tutor</h5>
          </div>
          <div className="postContent">
            <h3>Title</h3>
            <p>12/2/2022 16:50</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
              Reprehenderit,
            </p>
          </div>
          <div className="postFooter">
            <div className="likes">
              2{'  '}
              <ThumbUpIcon color="primary" />
            </div>
            <CommentIcon
              color="primary"
              onClick={() =>
                showComments ? setShowComments(false) : setShowComments(true)
              }
            />
          </div>
        </Paper>
        {showComments ? (
          <div className="comment-container">
            <Comment />
            <ShareComment />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Post;
