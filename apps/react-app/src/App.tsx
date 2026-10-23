import { RouterProvider } from "react-router-dom";

import Router from "./Router";
import { AuthProvider, PostProvider } from "./context";

import CategoriesPage from "./components/Page/CategoriesPage/CategoriesPage";
import PostPage from "./components/Page/PostPage/PostPage";
import LoginPage  from "./components/Page/LoginPage/LoginPage";

function App() {
  return (
    <AuthProvider>
      {// ACT 7 - Render SnackbarProvider component (Done)
    // Dentro de PostProvider para que pueda ser usado en toda la app
    }
      <PostProvider>
        <RouterProvider router={Router} />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
