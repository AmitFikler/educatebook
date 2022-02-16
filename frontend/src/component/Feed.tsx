import Post from './Post';
import Share from './Share';

function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
      </div>
    </div>
  );
}

export default Feed;
