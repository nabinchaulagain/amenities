import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { LiveHelp, QuestionAnswer } from '@material-ui/icons';
import CommentForm from './CommentForm';
import useEnhancedDispatch from '../../../utils/useEnhancedDispatch';
import { answerQuestion } from '../../../actions/comment.action';

const Comment = ({ id, question, answer, username, isAdOwner }) => {
  const dispatch = useEnhancedDispatch();
  return (
    <Box mt={2} mb={2}>
      <CommentItem text={question} username={username} />
      <Box ml={3} mt={1}>
        {answer && (
          <CommentItem
            text={answer}
            username="seller"
            isAnswer={true}
          ></CommentItem>
        )}
        {!answer && isAdOwner && (
          <CommentForm
            placeholder={`answer ${username}'s question`}
            onSubmit={(text) => {
              dispatch(answerQuestion(id, text));
            }}
          ></CommentForm>
        )}
      </Box>
    </Box>
  );
};

const CommentItem = ({ text, username, isAnswer, ...props }) => {
  return (
    <Grid container {...props}>
      <Grid className="icon" item>
        {isAnswer ? <QuestionAnswer /> : <LiveHelp />}
      </Grid>
      <Grid item>
        {text}
        <Box
          variant="subtitle2"
          color="text.secondary"
          className="comment-user-displayer"
        >
          {isAnswer ? 'answered' : 'asked'} by {username}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Comment;
