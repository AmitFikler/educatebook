import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import Share from './Share';
import { PostType, UserType } from '../../../@types/@types';
import { getToken } from '../../helpers/tokenHelper';
import { UserContext } from '../../contexts/User/UserContext';
import { toast } from 'react-toastify';
import { ReactComponent as Spinner } from '../../images/spinner.svg';

function Feed() {
  const { user, setUser } = useContext(UserContext)!;

  // State
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await axios.get(`/api/post`);
    setPosts(data.reverse()); // reverse to show latest post first
  };

  const shareNewPost = async (
    title: string,
    content: string,
    picture: string | ArrayBuffer | null
  ) => {
    try {
      setLoading(true);
      const post = await axios.post(
        `/api/post`,
        {
          title,
          content,
          picture,
        },
        {
          headers: {
            authorization: getToken()!,
          },
        }
      );
      const { data } = await axios.get(`""/api/post/${post.data._id}`);
      if (data && user) {
        setUser({ ...user, posts: [data._id, ...user.posts] } as UserType);
        setLoading(false);
        setPosts([data, ...posts]); // add new post to the top of the list
        toast('Post shared successfully', {
          type: 'success',
        });
      }
    } catch (error) {
      setLoading(false);
      toast(error.response.data.error, {
        type: 'error',
      });
    }
  };

  const shareAComment = async (commentOn: string, content: string) => {
    try {
      const comment = await axios.post(
        `""/api/comment`,
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
      toast(error.response.data.error, {
        type: 'error',
      });
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`""/api/post/${postId}`, {
        headers: {
          authorization: getToken()!,
        },
      });
      setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));
      toast('Post deleted successfully', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response.data.error, {
        type: 'error',
      });
    }
  };

  const handleLike = async (
    postId: string,
    likes: number,
    type: 'like' | 'unlike'
  ) => {
    try {
      await axios.put(
        `""/api/post/like`,
        { postId, likes, type },
        {
          headers: {
            authorization: getToken()!,
          },
        }
      );
      if (user) {
        if (type === 'like') {
          setUser({ ...user, likes: [...user.likes, postId] } as UserType); // add postId to user's likes
          setPosts((prevPost) => {
            return prevPost.map((post) => {
              if (post._id === postId) {
                post.likes = likes;
              }
              return post;
            });
          });
        } else {
          setUser({
            ...user,
            likes: user.likes.filter((id) => id !== postId), // remove postId from user's likes
          } as UserType);
          setPosts((prevPost) => {
            return prevPost.map((post) => {
              if (post._id === postId) {
                post.likes = likes;
              }
              return post;
            });
          });
        }
      }
    } catch (error) {
      toast(error.response.data.error, {
        type: 'error',
      });
    }
  };

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share shareNewPost={shareNewPost} />
        {loading ? <Spinner /> : null}
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            shareAComment={shareAComment}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
