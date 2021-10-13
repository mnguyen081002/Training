import express, { Request, Response } from 'express';
import { Post } from '../entity/Post';
import userService from '../services/user.service';
import postService from '../services/post.service';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.send({ posts });
});

router.post('/', async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const user = await userService.findOneUserById('111');
  const post = await postService.createPost(title, body, user);

  res.send({ message: 'Create post successfully', post });
});

router.put('/:id', async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const postId = req.params.id;
  await postService.updatePost(title, body, postId);

  res.send({ message: 'Post successfully updated' });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const postId = req.params.id;
  await postService.deletePostById(postId);

  res.send({ message: 'Post successfully deleted' });
});

export default router;
