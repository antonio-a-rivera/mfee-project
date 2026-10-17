import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import Banner from "../../Banner/Banner";
import Comments from "../../Comments/Comments";
import Loading from "../../Loading";
import { getPost } from "../../../api/endpoints/posts";
import { Post } from "../../../types";

const postID = "e28e1eeeedac062f3394817b";

function PostPage() {
  // ACT 9 - Use postID variable to fetch the post data (Done)
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPost(null);
    getPost({
      postID,
      onSuccess: setPost,
      onError: (requestError) => setError(requestError.message),
      onLoading: setLoading,
    });
  }, []);

  if (loading) return <Loading />;

  if (error) {
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
      <BannerContainer item>
        <Banner
          postImage={post.image}
          postTitle={post.title}
        />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={post.comments ?? []} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
