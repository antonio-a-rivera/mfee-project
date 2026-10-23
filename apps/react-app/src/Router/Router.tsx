import { createBrowserRouter } from "react-router-dom";
import Page, {
  CategoriesPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PostPage,
} from "../components/Page";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute route={<Page page={<HomePage />} />} />,
  },
  // ACT 10 - Render PostPage component inside a private route and mark postID as a params (Done)
  {
    path: "/posts/:postID",
    element: <PrivateRoute route={<Page page={<PostPage />} />} />,
  },
  // ACT 10 - Render CategoriesPage component inside a private route (Done)
  {
    path: "/categories",
    element: <PrivateRoute route={<Page page={<CategoriesPage />} />} />,
  },
  // ACT 10 - Render LoginPage component inside a private route (Done)
  {
    path: "/login",
    element: <LoginPage />
  },
  // ACT 10 - Render NotFoundPage component for undefined routes (Done)
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Router;
