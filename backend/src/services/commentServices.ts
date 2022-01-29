import { isValidObjectId } from 'mongoose';
import { Comment } from '../models/Comments';
import { Post } from '../models/Post';
import { User } from '../models/User';

const commentAPost = async (
  content: string,
  commentOn: string,
  usernameId: string
) => {
  if (!isValidObjectId(commentOn)) {
    throw { status: '404', message: 'post not found' };
  }
  const newComment = await Comment.create({
    // create new comment
    usernameId,
    content,
    commentOn,
  });
  await User.findByIdAndUpdate(usernameId, {
    $addToSet: { comments: newComment },
  }); // add new comment to user's comments
  await Post.findByIdAndUpdate(commentOn, {
    $addToSet: { comments: newComment },
  }); // add new comment to post's comments
  return newComment;
};

export { commentAPost };
