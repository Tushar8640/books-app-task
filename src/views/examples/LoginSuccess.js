import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

const LoginSuccess = () => {
  return (
    <div>
      <Container>
        <div className="text-center my-5">
          <h1>Login successful</h1>

          <Link className="text-center" to="/admin/index">
            {" "}
            <Button className="flex justify-content-center" color="primary">
             Go To Dashboad
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginSuccess;
