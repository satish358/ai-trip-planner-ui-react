import axios from "axios";
import { Formik } from "formik";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { BASE_API_URL } from "../main";
import Swal from "sweetalert2";

export type LoginPageProps = {
  pageSetter: any;
};
const LoginPage = ({ pageSetter }: LoginPageProps) => {
  useEffect(() => {
    const res = sessionStorage.getItem("LOGIN");
    if (res == "true") pageSetter("home");
  }, []);
  const onSubmit = (values: any) => {
    console.log(values);

    axios
      .post(BASE_API_URL + "/login", values)
      .then((res) => {
        if (res.data?.error) {
          Swal.fire({
            title: "Wrong credentials !",
            text: "Please enter right credentials and try again.",
            icon: "warning",
          });
        } else {
          sessionStorage.setItem("LOGIN", "true");
          pageSetter("home");
        }
      })
      .catch(() => {
        Swal.fire({
          title: "CORS Error!",
          text: "Please eenable cors",
          icon: "error",
        });
      });
  };
  return (
    <div className="card-wrapper">
      <Card className="mt-5">
        <Card.Header>User Authentication</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form method="post" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleChange}
                      value={values.email}
                      required
                      name="email"
                    ></input>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      required
                    ></input>
                  </div>
                </div>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
