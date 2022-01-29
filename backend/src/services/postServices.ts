import { Post } from '../models/Post';
import { User } from '../models/User';

const createNewPost = async (id: string, title: string, content: string) => {
  const newPost = await Post.create({
    // create new post
    usernameId: id,
    title,
    content,
  });
  await User.findByIdAndUpdate(id, {
    $addToSet: { posts: newPost }, // add new post to user's posts
  });
  return newPost;
};

const likeAPostService = async (postId: string) => {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } } // increment likes by 1
    );
    return post;
  } catch (e) {
    throw { status: 404, message: 'Post not found' };
  }
};

export { createNewPost, likeAPostService };
