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
  usernameId: UserForPost;
  content: string;
  createdAt: Date;
}

interface UserForPost {
  username: string;
  role: string;
}
