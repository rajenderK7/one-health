import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import roles from "../constants/roles";
import { signUpWithGoogle } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const Login = () => {
  const [selectedRole, setRole] = useState<number>(-1);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signUpWithGoogle(selectedRole);
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="rolesInput">
        {roles.map((item, index) => {
          return (
            <Form.Check
              key={index}
              value={index + 1}
              type="radio"
              aria-label="radio-button"
              label={item}
              onChange={handleChange}
              checked={index + 1 == selectedRole}
            />
          );
        })}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Login;
