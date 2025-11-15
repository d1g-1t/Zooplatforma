export type Action = {
  type: selectType;
};

export type selectType = 'POPULAR' | 'NOT_POPULAR' | 'NEW' | 'OLD';

export type sorterOptionType = {
  name: selectType;
  text: string;
};

export type User = {
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  verified: boolean;
};

export type CommentType = {
  id: number;
  date: string;
  text: string;
  likesNumber: number;
  author: User;
};

export interface CommentsProps {
  comments: CommentType[];
  initialCommentsCount?: number;
  moreCommentsCount?: number;
}
