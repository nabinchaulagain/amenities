import React from 'react';
import Comment from './Comment';
import { Card, Typography } from '@material-ui/core';
import CommentForm from './CommentForm';

const comments = [
  { id: 1, question: 'questtionaarie', answer: 'asdasd', username: 'yes' },
  {
    id: 2,
    question: 'is this real?',
    answer: 'yes, real as it gets.',
    username: 'big'
  },
  { id: 3, question: 'sadasd', username: 'nothing' }
];

const CommentList = ({ isAdOwner }) => {
  return (
    <Card color="inherit" className="comment-list-container">
      <Typography variant="h5" component="h3">
        Queries
      </Typography>
      <CommentForm placeholder="Ask a question" />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            {...comment}
            isAdOwner={isAdOwner}
          ></Comment>
        );
      })}
    </Card>
  );
};

export default CommentList;
