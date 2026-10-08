import { PageContainer } from "./LoginPage.styles";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useEffect } from "react";
import LogInForm from "../../Form/LogInForms";
import { NewUser} from "../../../types";


function LoginPage () {
const [openForm, setOpenForm] = useState(false);
const [isLogin, setIsLogin] = useState(false);
const [userData, setUserData] = useState<NewUser | null>(null);

const handleOpenFormLog = () => {
    setIsLogin(true)
    setOpenForm(true);
  }

  const handleOpenFormSign = () => {
    setIsLogin(false)
    setOpenForm(true);
  }

  const addUser = (user: NewUser) => {
    setUserData(user);
  };

  return (
    <PageContainer container>
      <Button variant="contained" onClick={handleOpenFormLog}>
          Log in
        </Button>
        <Button variant="contained" onClick={handleOpenFormSign}>
          Sign up
        </Button>
      <Grid item md={4} xs={4} lg={4}>
        {/* ACT 8 - Create a form to Login and SignUp (Done) */}
        <LogInForm open={openForm} setOpen={setOpenForm} addUser={addUser} setIsLogin={setIsLogin} isLogin={isLogin} />
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
