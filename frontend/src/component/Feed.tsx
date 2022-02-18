import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';
import Share from './Share';
import { PostType } from '../../@types/@types';
import { getToken } from '../helpers/tokenHelper';

function Feed() {
  // State
  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch posts
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

  const shareAComment = async (commentOn: string, content: string) => {
    try {
      const comment = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/comment`,
        {
          content,
          commentOn,
        },
        {
          headers: {
            authorization: getToken()!, // get token from local storage
          },
        }
      );
      setPosts((prevPost) => {
        return prevPost.map((post) => {
          if (post._id === comment.data.commentOn) {
            post.comments = [...post.comments, comment.data];
          }
          return post;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/post/${postId}`,
        {
          headers: {
            authorization: getToken()!,
          },
        }
      );
      setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share shareNewPost={shareNewPost} />
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            shareAComment={shareAComment}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
