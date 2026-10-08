// Forms de usuarios
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
import { NewUser, UserFormInputs } from "../../types";

const emptyInputs: UserFormInputs = {
  firstname: { value: "", error: "" },
  lastname: { value: "", error: "" },
  username: { value: "", error: "" },
  password: { value: "", error: "" },
}

interface UserFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addUser: (user: NewUser) => void;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin?: boolean;
}

const LogInForm = ({ open, setOpen, addUser, setIsLogin, isLogin }: UserFormProps) => {
  const [userInputs, setUserInputs] = React.useState(emptyInputs);
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleClose = () => {
    setUserInputs(emptyInputs);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormUser: NewUser = {
      firstname: userInputs.firstname.value,
      lastname: userInputs.lastname.value,
      username: userInputs.username.value,
      password: userInputs.password.value,

    };

    handleClose();
    addUser(newFormUser);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validator({ name, value });
    setUserInputs((prevInputs) => ({
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
        {isLogin ? "Log In" : "Sign Up"}
      </DialogTitle>
      <DialogContent>
        {!isLogin && (
          <>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={userInputs.firstname.value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!userInputs.firstname.error}
              helperText={userInputs.firstname.error}
            />
            <TextField
              margin="dense"
              name="lastname"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={userInputs.lastname.value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!userInputs.lastname.error}
              helperText={userInputs.lastname.error}
            />
          </>
        )}

        <TextField
          autoFocus={isLogin}
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          value={userInputs.username.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!userInputs.username.error}
          helperText={userInputs.username.error}
        />

        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={userInputs.password.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!userInputs.password.error}
          helperText={userInputs.password.error}
        />

        {!isLogin && (
          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword !== "" && userInputs.password.value !== confirmPassword}
            helperText={
              confirmPassword !== "" && userInputs.password.value !== confirmPassword
                ? "Las contraseñas no coinciden"
                : ""
            }
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{isLogin ? "Log In" : "Sign Up"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogInForm;