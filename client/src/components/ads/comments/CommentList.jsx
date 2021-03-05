import React from 'react';
import Comment from './Comment';
import { Card, Typography } from '@material-ui/core';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import { askQuestion } from '../../../actions/comment.action';
import useEnhancedDispatch from '../../../hooks/useEnhancedDispatch';

const CommentList = ({ adId, isAdOwner }) => {
  const comments = useSelector((state) => state.comments.list);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useEnhancedDispatch();
  return (
    <Card color="inherit" className="comment-list-container">
      <Typography variant="h5" component="h3">
        Queries
      </Typography>
      {isLoggedIn && (
        <CommentForm
          placeholder="Ask a question"
          onSubmit={(value) => {
            dispatch(askQuestion(adId, value));
          }}
        />
      )}
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
