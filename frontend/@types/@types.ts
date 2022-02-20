export interface PostType {
  _id: string;
  title: string;
  content: string;
  likes: number;
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
  username: string;
  role: string;
}

export interface UserType {
  _id: string | undefined;
  username: string;
  password: string;
  role: string;
  posts: string[];
  comments: string[];
  likes: string[];
}
