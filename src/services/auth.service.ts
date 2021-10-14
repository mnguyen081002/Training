import logger from '../config/logger';
import { User } from '../entity/User';
import ApiError from '../utils/ApiError';

const signUp = async (username: string, password: string) => {
  try {
    await checkUsernameAlreadyExists(username);

    const user = User.create({ username, password });

    await user.save();
    return user.toJson();
  } catch (error) {
    let message = 'An error occurred';
    let code = 500;
    if (error instanceof Error) {
      message = error.message;
      code = 400;
    }
    throw new ApiError(code, message);
  }
};

const signIn = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    if (!user.isValidPassword(password)) {
      throw new Error('Invalid Password');
    }
    return user.generateToken();
  } catch (error) {
    let message = 'An error occurred';
    let code = 500;
    if (error instanceof Error) {
      message = error.message;
      code = 401;
    }
    if (error instanceof ApiError) {
      message = error.message;
      code = error.statusCode;
    }
    throw new ApiError(code, message);
  }
};

const checkUsernameAlreadyExists = async (username: string) => {
  let user = await User.findOne({ username });

  if (user) {
    throw new Error(`User already exists`);
  }
};
export default {
  signUp,
  signIn,
};
