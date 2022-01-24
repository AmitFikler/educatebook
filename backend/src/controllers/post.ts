import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';

const postAPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = req.decodedToken;
    const { title, content } = req.body;

    if (title && content) {
      // create new post
      const newPost = await Post.create({
        usernameId: decodedToken!.id,
        title,
        content,
      });
      await User.findByIdAndUpdate(
        decodedToken!.id,
        {
          $addToSet: { posts: newPost }, // push post to array of posts
        },
        (err, updated) => {
          if (err) {
            throw { status: 404, message: 'User not found' }; // TODO async/await or cb
          }
          return res.send(newPost); // succuss
        }
      ).clone();
    } else {
      throw { status: 400, message: 'title or content is missing..' };
    }
  } catch (error) {
    next(error);
  }
};

const likeAPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.body;
  try {
    if (!postId) throw { status: 400, message: 'Post id is missing' };
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } } // increment likes by 1
    );
    if (!post) throw { status: 404, message: 'Post not found' }; //TODO throw 404 and not 500
    res.send(`${postId} has ${post!.likes} likes `);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find({}); // find all posts
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = req.decodedToken;
  const { id } = req.params;
  try {
    const postToDelete = await Post.findById(id);
    if (postToDelete?.usernameId == decodedToken!.id) {
      // Verifies if the user's post
      await Post.findByIdAndDelete(id); // delete post from Posts
      User.findByIdAndUpdate(
        decodedToken!.id,
        { $pullAll: { posts: [id] } },
        (err, data) => {
          if (!err) {
            res.send(`${id} delete`); // TODO async/await or cb
          }
        }
      ).clone();
    } else {
      throw {
        status: 401,
        message: 'You are not authorized to delete this post',
      };
    }
  } catch (error) {
    next(error);
  }
};

export { postAPost, likeAPost, getAllPosts, deletePost };
