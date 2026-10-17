import { PageContainer } from "./LoginPage.styles";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Button, CircularProgress, Grid } from "@mui/material";
import LogInForm from "../../Form/LogInForm";
import { NewUser } from "../../../types";
import { createUser, login } from "../../../api/endpoints/auth";

function LoginPage() {
  const [openForm, setOpenForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleOpenFormLog = () => {
    setError(null);
    setSuccess(null);
    setIsLogin(true);
    setOpenForm(true);
  };

  const handleOpenFormSign = () => {
    setError(null);
    setSuccess(null);
    setIsLogin(false);
    setOpenForm(true);
  }

  const addUser = (user: NewUser) => {
    setError(null);
    setSuccess(null);

    const callbacks = {
      onLoading: setLoading,
      onSuccess: (data: { message: string }) => {
        setSuccess(data.message ?? "Operation successful");
      },
      onError: (err: Error) =>
        setError(err.message ?? "Error creating user"),
    };

    if (isLogin) {
      login({
        user: { username: user.username, password: user.password },
        ...callbacks,
      });
      return;
    }

    createUser({
      newUser: {
        name: [user.firstname, user.lastname].filter(Boolean).join(" "),
        username: user.username,
        password: user.password,
      },
      ...callbacks,
    });
  };

  // ACT 9 - Use the login and register APIs (Done)

  return (
    <PageContainer container>
      <Button variant="contained" onClick={handleOpenFormLog} disabled={loading}>
        Log in
      </Button>
      <Button variant="contained" onClick={handleOpenFormSign} disabled={loading}>
        Sign up
      </Button>
      {loading && <CircularProgress size={24} aria-label="Loading" />}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Grid item md={4} xs={4} lg={4}>
        {/* ACT 8 - Create a form to Login and SignUp (Done) */}
        <LogInForm open={openForm} setOpen={setOpenForm} addUser={addUser} setIsLogin={setIsLogin} isLogin={isLogin} />
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
