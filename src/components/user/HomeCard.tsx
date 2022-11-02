import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export interface HomeCardProps {
  title: string;
  description?: string;
  linkText?: any;
  link: string;
}

function HomeCard({ title, description, linkText, link }: HomeCardProps) {
  return (
    <Card
      style={{ maxWidth: "300px", minWidth: "150px" }}
      className="mx-2 mt-2"
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Link to={link}>
        <Button className="ms-3 mb-3" variant="primary">
          {linkText}
        </Button>
      </Link>
    </Card>
  );
}

export default HomeCard;
