import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard/CommentCard";
import { useState } from "react";
import { useEffect } from "react";
import CommentForm from "../Form/CommentForm";
import { newComment } from "../../types";

import Button from '@mui/material/Button';

interface props {
  comments: newComment[];
}

// ACT 3 - Receive comments prop (Done)
function Comments({ comments }: props) {
  const [openForm, setOpenForm] = useState(false);
  const [newComments, setNewComments] = useState<newComment[]>(comments);

  const handleOpenForm = () => {
    setOpenForm(true);
  }

  const addComment = (comment: newComment) => {
    setNewComments((prevComments) => [...prevComments, comment]);
  };

    return (
      <Container container>
        <Title item sm={8}>
          <h4>Comments</h4>
        </Title>
        {/* ACT 1 = Render CommentCard component (Done) */}
        {/* ACT 3 - Send one comment (comments[0]) as prop to CommentCard component (Done) */}
        {/* ACT 5 - Iterate comments to render CommentCard component for each comment (Done) */}
        {newComments.map((comment) => {
          return <CommentCard author={comment.author} content={comment.content} />
        })}
        <FormContainer item sm={8}>
          {/* ACT 8 - Create a form to add comments (Done) */}
          <CommentForm open={openForm} setOpen={setOpenForm} addComment={addComment} />
        </FormContainer>
        <Button variant="contained" onClick={handleOpenForm}>
          Add Comment
        </Button>
      </Container>
    );
  }

  export default Comments;
