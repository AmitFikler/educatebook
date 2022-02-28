export interface PostType {
  _id: string;
  title: string;
  content: string;
  likes: number;
  picture: string;
  comments: CommentType[];
  createdAt: Date;
  usernameId: UserForPost;
}

export interface CommentType {
  _id: string;
  usernameId: UserForPost;
  content: string;
  createdAt: Date;
}

interface UserForPost {
  _id: string;
  fullName: string;
  role: string;
  picture: string;
}

export interface UserType {
  _id: string | undefined;
  fullName: string;
  email: string;
  password: string;
  role: string;
  posts: string[];
  comments: string[];
  likes: string[];
  picture: string;
}

export interface Message {
  message: string;
  username: string;
  createdAt: Date;
  room: string;
  _id: string;
}
