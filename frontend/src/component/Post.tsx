import { Avatar, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <Paper style={{ padding: '10px' }}>
          <div className="postOwner">
            <Avatar>A</Avatar>
            <p className="postEmail">amitfikler@gmail.com</p>
          </div>
          <h5>Tutor</h5>
          <div className="postContent">
            <h3>Title</h3>
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
            <CommentIcon color="primary" />
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Post;
