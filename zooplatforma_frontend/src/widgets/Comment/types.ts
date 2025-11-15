type User = {
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  verified: boolean;
};

export interface CommentProps {
  author: User;
  likesNumber: number;
  date: string;
  text: string;
  isLast: boolean;
}
