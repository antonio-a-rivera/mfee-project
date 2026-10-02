import { Grid } from "@mui/material";

import { HomePage } from "./components/Page";
import CategoriesPage from "./components/Page/CategoriesPage/CategoriesPage";
import PostPage from "./components/Page/PostPage/PostPage";
import { LoginPage } from "./components/Page";
import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";
import NavBar from "./components/NavBar";

function App() {
  const page: string = "PostPage";
  return (
    <>
      <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
        <NavBar />
        <Grid
          container
          item
          wrap="nowrap"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 84px)",
          }}
        >
          {page === "HomePage" && <HomePage />}
          {/* ACT 1 - Render PostPage and CategoriesPage components (Done)*/}
          {/* ACT 2 - Move the following content to a new component called LoginPage and render it (Done) */}
          {/* ACT 4 - Add conditions to render PostPage, LoginPage and CategoriesPage components (Done) */}
          {page === "PostPage" && <PostPage />}
          {page === "CategoriesPage" && <CategoriesPage />}
          {page === "LoginPage" && <LoginPage />}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
