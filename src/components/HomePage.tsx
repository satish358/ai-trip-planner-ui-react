import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BASE_API_URL } from "../main";
import Swal from "sweetalert2";

export type HomePageProps = {
  pageSetter: any;
};
const HomePage = ({ pageSetter }: HomePageProps) => {
  const [gptResponse, setGptResponse] = useState<any>([]);
  const [btnText, setBtnText] = useState("Search");
  const daysArr = [1, 2, 3, 4, 5, 6, 7];
  const travel_styles = [
    "Relaxation",
    "Cultural and Historical",
    "Romatic for couples",
    "family-friendly",
    "adventure and outdoor",
  ];

  useEffect(() => {
    const res = sessionStorage.getItem("LOGIN");
    if (res != "true") pageSetter("login");
  }, []);
  const onSubmit = (values: any) => {
    console.log(values);
    setBtnText("Loading...");
    axios
      .post(BASE_API_URL + "/calculate", values)
      .then((res) => {
        if (res.data?.error) {
          Swal.fire({
            title: "Chat GPT API Error !",
            text: "Chat GPT producing wrong formate error",
            icon: "warning",
          });
        } else {
          // do assignment
          setGptResponse(res.data);
        }
        setBtnText("Search");
      })
      .catch(() => {
        Swal.fire({
          title: "CORS Error!",
          text: "Please eenable cors",
          icon: "error",
        });
        setBtnText("Search");
      });
  };

  const logout = () => {
    sessionStorage.clear();
    pageSetter("login");
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Search Result</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              day: 1,
              city: "",
              state: "",
              travel_style: "Relaxation",
            }}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form method="post" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Select Travel Days</label>
                    <select
                      className="form-control"
                      onChange={handleChange}
                      value={values.day}
                      required
                      name="day"
                    >
                      {daysArr.map((item) => (
                        <option key={item} value={item}>
                          {item} Day/Days
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      minLength={3}
                      className="form-control"
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      required
                    ></input>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      minLength={3}
                      className="form-control"
                      onChange={handleChange}
                      value={values.state}
                      name="state"
                      required
                    ></input>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Select Travel style</label>
                    <select
                      className="form-control"
                      onChange={handleChange}
                      value={values.travel_style}
                      required
                      name="travel_style"
                    >
                      {travel_styles.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={btnText != "Search"}
                >
                  {btnText}
                </Button>
                <Button
                  className="ms-3"
                  type="button"
                  onClick={logout}
                  variant="outline-danger"
                >
                  Logout
                </Button>
              </form>
            )}
          </Formik>
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col md={12}>
          <h3>Trip to {gptResponse?.destination}</h3> <hr />
        </Col>
        {gptResponse?.travel_plan?.map((plan: any) => (
          <Col md={12} key={"day" + plan.day} className="mt-2">
            <h4>Day - {plan.day}</h4>
            {plan.activities.map((activity: any) => (
              <Card className="mt-3" key={activity.activity}>
                <Card.Header className="bg-primary text-white">
                  Activity - <b>{activity?.activity?.toUpperCase()} </b>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Location - {activity?.location} :{" "}
                    <span className="text-danger">{activity?.time}</span>
                  </Card.Title>
                  <Card.Text>{activity.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
