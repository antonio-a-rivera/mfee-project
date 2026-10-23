import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

// ACT 3 - Receive postImage and postTitle props (Done)
function Banner({
  postImage,
  postTitle,
}: {
  postImage: string;
  postTitle: string;
}) {
  const navigate = useNavigate();

  return (
    <Container image={postImage}>
      {/* ACT 3 - Send postImage as image prop to Container component (Done) */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}
        // ACT 10 - Navigate to Home page (Done)
        onClick={() => navigate("/")}
        >
          View Posts
        </Button>
        <BannerTitle variant="h3">
          {/* ACT 1 - Render postTitle (Done) */
            postTitle
          }</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
