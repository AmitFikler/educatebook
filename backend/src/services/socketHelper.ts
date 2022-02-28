import { Message } from '../models/Message';

export const saveMessage = async (
  message: string,
  username: string,
  room: string
) => {
  try {
    const newMessage = await Message.create({
      username,
      message,
      room,
    });
    return newMessage;
  } catch (error) {
    throw error;
  }
};

export const getAllMessages = async (room: string) => {
  return await Message.find({ room });
};
