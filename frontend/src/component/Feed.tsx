import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';
import Share from './Share';
import { PostType } from '../../@types/@types';

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/api/post`
    );
    setPosts(data);
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
