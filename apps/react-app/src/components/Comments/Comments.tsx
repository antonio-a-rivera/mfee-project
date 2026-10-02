import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard/CommentCard";


// ACT 3 - Receive comments prop (Done)
function Comments(props: { comments: {_id: string; author: string; content: string; createdAt: string; updatedAt: string; __v: string }[] }) {
  const { comments } = props;
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* ACT 1 = Render CommentCard component (Done) */}
      {/* ACT 3 - Send one comment (comments[0]) as prop to CommentCard component (Done) */}
      return <CommentCard author={comments[0].author} content={comments[0].content} />
      {/* ACT 5 - Iterate comments to render CommentCard component for each comment */}
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;
