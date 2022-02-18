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
  return newComment.populate('usernameId');
};

const deleteACommentService = async (commentId: string, userId: string) => {
  if (!isValidObjectId(commentId)) {
    throw { status: '404', message: 'comment not found' };
  }
  const commentToDelete = await Comment.findById(commentId); // get comment to delete
  if (!commentToDelete) {
    throw { status: '404', message: 'comment not found' };
  } // if comment doesn't exist
  if (commentToDelete?.usernameId.toString() !== userId) {
    throw { status: '401', message: 'unauthorized' }; // if user is not the owner of the comment
  }
  await Comment.findByIdAndDelete(commentId); // delete comment from Comments
  await User.findByIdAndUpdate(userId, { $pull: { comments: commentId } }); // remove comment from user's comments
  await Post.findByIdAndUpdate(commentToDelete?.commentOn, {
    // remove comment from post's comments
    $pull: { comments: commentId },
  });
  return commentToDelete;
};

export { commentAPost, deleteACommentService };
