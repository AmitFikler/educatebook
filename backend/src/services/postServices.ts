import { isValidObjectId } from 'mongoose';
import { Post } from '../models/Post';
import { User } from '../models/User';

const createNewPost = async (
  id: string,
  title: string,
  content: string,
  picture: string | null
) => {
  const newPost = await Post.create({
    // create new post
    usernameId: id,
    title,
    content,
    picture,
  });
  await User.findByIdAndUpdate(id, {
    $addToSet: { posts: newPost }, // add new post to user's posts
  });
  return newPost;
};

const likeAPostService = async (
  postId: string,
  usernameId: string,
  likes: number,
  type: 'like' | 'unlike'
) => {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { likes: likes } // update likes
    );
    if (type === 'like') {
      await User.findByIdAndUpdate(usernameId, {
        $addToSet: { likes: postId }, // add post to user's likes
      });
    } else {
      await User.findByIdAndUpdate(usernameId, {
        $pull: { likes: postId }, // remove post from user's likes
      });
    }
    return post;
  } catch (e) {
    throw { status: 404, message: 'Post not found' };
  }
};

const deletePostService = async (postId: string, userId: string) => {
  try {
    if (!isValidObjectId(postId))
      throw { status: 404, message: 'Invalid post id' };
    const postToDelete = await Post.findById(postId); // get post to delete
    if (!postToDelete) throw { status: 404, message: 'Post not found' }; // if post doesn't exist
    if (postToDelete.usernameId.toString() !== userId)
      // if user is not the owner of the post
      throw { status: 401, message: 'Unauthorized' };

    await Post.findByIdAndDelete(postId); // delete post from Posts
    await User.findByIdAndUpdate(userId, { $pullAll: { posts: [postId] } }); // remove post from user's posts
    return 'deleted';
  } catch (error) {
    throw error;
  }
};

export { createNewPost, likeAPostService, deletePostService };
