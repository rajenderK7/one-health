import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export interface HomeCardProps {
  title: string;
  description?: string;
  linkText?: string;
  link: string;
}

function HomeCard({ title, description, linkText, link }: HomeCardProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={link}>
          <Button variant="primary">{linkText}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
