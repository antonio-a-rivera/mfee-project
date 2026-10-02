import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

// ACT 3 - Receive comment prop (Done)
function CommentCard(props: { author: string; content: string }) {
  const {author, content} = props;
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        {/* ACT 1 - Render comment author (Done) */}
        <Author>{author}</Author>
        {/* ACT 1 - Render comment content (Done) */}
        <Typography>{content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
