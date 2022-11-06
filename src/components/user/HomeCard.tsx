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
    <Card style={{ width: "300px" }} className="p-3 mt-2 mb-3 shadow">
      <Card.Body className="mb-3">
        <Card.Title>{title}</Card.Title>
        <hr></hr>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Link to={link}>
        <Button className="mb-1 float-end" variant="primary">
          {linkText}
        </Button>
      </Link>
    </Card>
  );
}

export default HomeCard;
