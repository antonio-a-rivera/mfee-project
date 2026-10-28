import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { Container, BannerContainer, CommentsContainer, DescriptionContainer } from "./PostPage.styles";
import Banner from "../../Banner/Banner";
import Comments from "../../Comments/Comments";
import Loading from "../../Loading";
import { getPost } from "../../../api/services/posts";
import { Post } from "../../../types";


function PostPage() {
  // ACT 9 - Use postID variable to fetch the post data (Done)
  const { postID } = useParams<{ postID: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postID) {
      setError("Post ID is required.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setPost(null);
    getPost({
      postID,
      onSuccess: setPost,
      onError: (requestError) => setError(requestError.message),
      onLoading: setLoading,
    });
  }, [postID]);

  if (loading) return <Loading />;

  if (error) {
    // ACT 10 - Get postID from route params (Done)
    return (
      <Container container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container container>
        <Alert severity="warning">Post not found.</Alert>
      </Container>
    );
  }
  return (
    <Container container>
      Post page
      <BannerContainer item>
        {/* ACT 1 - Render Banner component (Done)*/}
        {/* ACT 3 - Send postImage and postTitle as props to Banner component (Done)*/}
        <Banner
          postImage={post.image}
          postTitle={post.title}
        />
      </BannerContainer>
      <DescriptionContainer item>
        {/* ACT 1 - Render post description (Done)*/}
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        {/* ACT 1 - Render Comments component (Done)*/}
        {/* ACT 3 - Send comments as prop to Comments component (Done) */}
        <Comments comments={post.comments} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
