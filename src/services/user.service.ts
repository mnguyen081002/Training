import { User } from '../entity/User';
import ApiError from '../utils/ApiError';

const findOneUserById = async (userId: number): Promise<User> => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};
export default {
  findOneUserById,
};
