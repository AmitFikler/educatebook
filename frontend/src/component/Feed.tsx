import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';
import Share from './Share';
import { PostType } from '../../@types/@types';
import { getToken } from '../helpers/tokenHelper';

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/api/post`
    );
    setPosts(data.reverse()); // reverse to show latest post first
  };

  const shareNewPost = async (title: string, content: string) => {
    try {
      const post = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/post`,
        {
          title,
          content,
        },
        {
          headers: {
            authorization: getToken()!,
          },
        }
      );
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/post/${post.data._id}`
      );
      setPosts([data, ...posts]); // add new post to the top of the list
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share shareNewPost={shareNewPost} />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
