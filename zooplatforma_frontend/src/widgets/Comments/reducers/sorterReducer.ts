import { Reducer } from 'react';
import { Action, CommentType } from '../types';

const sorterReducer: Reducer<CommentType[], Action> = (comments, action) => {
  switch (action.type) {
    case 'POPULAR': {
      const sortedComments = [...comments].sort((a, b) => {
        return a.likesNumber > b.likesNumber ? -1 : 1;
      });
      return sortedComments;
    }
    case 'NOT_POPULAR': {
      const sortedComments = [...comments].sort((a, b) => {
        return a.likesNumber > b.likesNumber ? 1 : -1;
      });
      return sortedComments;
    }
    case 'NEW': {
      const sortedComments = [...comments].sort((a, b) => {
        return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1;
      });
      return sortedComments;
    }
    case 'OLD': {
      const sortedComments = [...comments].sort((a, b) => {
        return new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1;
      });
      return sortedComments;
    }
    default: {
      return comments;
    }
  }
};

export default sorterReducer;
