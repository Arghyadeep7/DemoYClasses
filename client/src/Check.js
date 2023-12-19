import { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Toast, ToastContainer } from "react-bootstrap";

import axios from "axios";

import styles from "./Register.module.css";

const Check = () => {
  const date = new Date(),
    monthDigit = date.getMonth() + 1,
    month = date.toLocaleString("en-US", { month: "long" }),
    year = date.getFullYear(),
    day = date.getDate();

  // Email State variable
  const [email, setEmail] = useState("");

  // EmailError state variable
  const [emailError, setEmailError] = useState(false);

  // Details state variable and function
  const [details, setDetails] = useState({});

  // Loading state variable and function
  const [loading, setLoading] = useState(false);

  // Submit Response state variable and function
  const [submitted, setSubmitted] = useState(false);

  // Submit Handler
  const submitHandler = async (event) => {
    event.preventDefault();

    if (email === "") {
      return;
    }

    setLoading(true);

    const response = await axios
      .post("https://demo-y-classes-server.vercel.app/check", {
        email: email,
      })
      .then((res) => res.data);

    if (response.code === 400) {
      setEmailError(true);
    } else {
      setDetails(response.details);
      setSubmitted(true);
    }

    setLoading(false);
  };

  // Payment Handler
  const paymentHandler = async (event) => {
    
    event.preventDefault();

    setLoading(true);

    const response = await axios
      .post("https://demo-y-classes-server.vercel.app/update", {
        fname: details.fname,
        lname: details.lname,
        email: details.email,
        gender: details.gender,
        batch: event.target[0].value,
        month: month,
        year: year,
      })
      .then((res) => res.data);

    setLoading(false);

    if (response.code === 400) {
      alert("Some internal error Occurred\nPlease try again later!")
    } else {
      setDetails({...details, batch: event.target[0].value, month: month, year: year});
    }

  };

  // Reset Check Form Handler
  const resetHandler = () => {
    setEmail("");

    setEmailError(false);

    setLoading(false);

    setSubmitted(false);
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      {submitted ? (
        <div className={styles.main}>
          <div className="d-flex justify-content-between">
            <h4>Check Form</h4>
            <b>
              <i>
                {day}/{monthDigit}/{year}
              </i>
            </b>
          </div>
          <i>This form is for already registered users.</i>
          <br />
          Log in to see the <u>current status</u> of your membership.
          <br /><br />
            <b>
              New User? Click{" "}
              <Link to="/register">
                here
              </Link>
            </b>
          <br />
          <br />
          <b style={{ color: "red" }}>Monthly Fee : Rs. 500</b>
          <Form className="mt-3" onSubmit={submitHandler}>
            <Form.Label>
              <b>Email*</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              onChange={(event) => {
                setEmail(event.target.value.trim());
                setEmailError(false);
              }}
              isInvalid={emailError}
              required
            />

            <div
              style={{
                visibility: emailError ? "visible" : "hidden",
                color: "red",
              }}
              className="mb-3"
            >
              <b>Email not registered!!!</b>
            </div>

            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={submitHandler}
              disabled={loading}
            >
              {loading ? "Loading..." : "Check Status"}
            </Button>
          </Form>
        </div>
      ) : (
        <ToastContainer className="mt-4" position="top-center">
          <Toast>
            <Toast.Header closeButton={false}>
              <h2 className="m-auto">DemoYClasses</h2>
            </Toast.Header>
            <Toast.Header closeButton={false}>
              <h5
                className="m-auto"
                style={{
                  color:
                    month === details.month && year === details.year
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {month === details.month && year === details.year
                  ? "REGISTRATION SUCCESSFUL!!!"
                  : "PAYMENT PENDING ❌"}
              </h5>
            </Toast.Header>
            <Toast.Body className="fw-bold">
              <u>
                {(month !== details.month ||
                  year !== details.year) &&
                  "Last payment "}
                Details are as follows:
              </u>
              <br />
              <br />
              First Name -<b> {details.fname}</b>
              <br />
              Last Name -<b> {details.lname}</b>
              <br />
              Email -<b style={{ color: "red" }}> {email}</b>
              <br />
              Gender -
              <b>
                &nbsp;
                {details.gender === "1" && "Male"}
                {details.gender === "2" && "Female"}
                {details.gender === "3" && "Others"}
              </b>
              <br />
              Batch -
              <b>
                &nbsp;
                {details.batch === "1" && "(1) 6:00 AM - 7:00 AM"}
                {details.batch === "2" && "(2) 7:00 AM - 8:00 AM"}
                {details.batch === "3" && "(3) 8:00 AM - 9:00 AM"}
                {details.batch === "4" && "(4) 5:00 PM - 6:00 PM"}
              </b>
              <br />
              Month paid for -
              <b>
                {" "}
                {details.month}, {details.year}
              </b>
              <div className="text-center mt-3 mb-3">
                {month === details.month && year === details.year ? (
                  <h4 style={{ color: "green" }}>Payment Verified ✅</h4>
                ) : (
                  <>
                    <div className="mt-3 mb-3">
                      To renew Membership :
                      <br />
                      <i>
                        for{" "}
                        <u>
                          {month}, {year}
                        </u>
                      </i>
                    </div>
                    <Form onSubmit={paymentHandler}>
                      <Form.Label>
                        <b>Confirm batch:</b>
                      </Form.Label>
                      <Form.Select
                        defaultValue={details.batch}
                        className="mb-3"
                      >
                        <option value="1">(1) 6:00 AM - 7:00 AM</option>
                        <option value="2">(2) 7:00 AM - 8:00 AM</option>
                        <option value="3">(3) 8:00 AM - 9:00 AM</option>
                        <option value="4">(4) 5:00 PM - 6:00 PM</option>
                      </Form.Select>
                      <Button
                        variant="danger"
                        disabled={loading}
                        className="m-3"
                        onClick={resetHandler}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="m-3"
                      >
                        {!loading ? "PAY Rs. 500" : "Loading..."}
                      </Button>
                    </Form>
                  </>
                )}
                <h6>
                  {month}, {year}
                </h6>
              </div>
              {month === details.month && (
                <div className="text-center mt-3">
                  Please take a print-out of this receipt
                </div>
              )}
              <div className="mt-3 text-center">
                <Link
                  to="/register"
                >
                  <h5>Fill a new form</h5>
                </Link>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
};

export default Check;
