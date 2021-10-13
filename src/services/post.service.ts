import logger from '../config/logger';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { IPostResponse } from '../interfaces/IPost';
import ApiError from '../utils/ApiError';

const createPost = async (title: string, body: string, user: User): Promise<IPostResponse> => {
  try {
    const post = Post.create({ title, body, user });
    await post.save();
    return post.toJson();
  } catch (error) {
    logger.error(error);
    throw new ApiError(500, 'An error occured while writing Post.');
  }
};

const updatePost = async (title: string, body: string, postId: string) => {
  try {
    const post = await findOnePostById(postId);
    post.title = title;
    post.body = body;

    await post.save();
  } catch (error) {
    throw new ApiError(500, 'An error occure');
  }
};

const deletePostById = async (id: string) => {
  try {
    const post = await findOnePostById(id);
    await post.remove();
  } catch (error) {
    throw new ApiError(500, 'An error occure');
  }
};

const findOnePostById = async (id: string): Promise<Post> => {
  const post = await Post.findOne(id);

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }
  return post;
};

export default { createPost, findOnePostById, updatePost, deletePostById };
