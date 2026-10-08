// Forms de comentarios
import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { validator } from "../../common/utils";
import { CommentFormInputs, newComment } from "../../types";

const emptyInputs: CommentFormInputs = {
  author: { value: "", error: "" },
  content: { value: "", error: "" },
}

interface CommentFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addComment: (comment: newComment) => void;
}

const CommentForm = ({ open, setOpen, addComment }: CommentFormProps) => {
  const [commentInputs, setCommentInputs] = React.useState(emptyInputs);

  const handleClose = () => {
    setCommentInputs(emptyInputs);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormComment: newComment = {
      _id: Math.random().toString(36).substring(2, 9),
      author: commentInputs.author.value,
      content: commentInputs.content.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: "0",
    };

    handleClose();
    addComment(newFormComment);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validator({ name, value });
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [name]: { value, error },
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}>
      <DialogTitle>
        New Comment
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          value={commentInputs.author.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!commentInputs.author.error}
          helperText={commentInputs.author.error}
        />
        <TextField
          margin="dense"
          name="content"
          label="Content"
          type="text"
          fullWidth
          variant="standard"
          value={commentInputs.content.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!commentInputs.content.error}
          helperText={commentInputs.content.error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentForm;