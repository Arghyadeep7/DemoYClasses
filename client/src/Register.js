import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
  Badge,
} from "react-bootstrap";

import axios from "axios";

import styles from "./Register.module.css";

const Register = () => {
  const date = new Date(),
    monthDigit = date.getMonth() + 1,
    month = date.toLocaleString("en-US", { month: "long" }),
    year = date.getFullYear(),
    day = date.getDate();

  // First Name state variable and function
  const [fname, setFname] = useState("");
  // First Name state variable Error and function
  const [fnameError, setFnameError] = useState(false);

  // First Name state variable Handler
  const fnameHandler = (event) => {
    const val = event.target.value;
    setFname(val);
    if (/[A-Za-z\s]+$/.test(val) === false) {
      setFnameError(true);
    } else {
      setFnameError(false);
    }
  };

  // Last Name state variable and function
  const [lname, setLname] = useState("");
  // Last Name Error state variable and function
  const [lnameError, setLnameError] = useState(false);

  // Last Name state variable Handler
  const lnameHandler = (event) => {
    const val = event.target.value;
    setLname(val);
    if (val !== "" && /[A-Za-z\s]+$/.test(val) === false) {
      setLnameError(true);
    } else {
      setLnameError(false);
    }
  };

  // Email state variable and function
  const [email, setEmail] = useState("");
  // Email Error state variable and function
  const [emailError, setEmailError] = useState("false");

  // Email state variable Handler
  const emailHandler = (event) => {
    const val = event.target.value.trim();
    setEmail(val);
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        val
      ) === false
    ) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("false");
    }
  };

  // Gender state variable and function
  const [gender, setGender] = useState(0);
  // Gender Error state variable and function
  const [genderError, setGenderError] = useState(false);

  // Gender state variable Handler
  const genderHandler = (event) => {
    const val = event.target.value;
    setGender(val);
    if (val === "0") {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
  };

  // Batch state variable and function
  const [batch, setBatch] = useState(0);
  // Batch Error state variable and function
  const [batchError, setBatchError] = useState(false);

  // Batch state variable Handler
  const batchHandler = (event) => {
    const val = event.target.value;
    setBatch(val);
    if (val === "0") {
      setBatchError(true);
    } else {
      setBatchError(false);
    }
  };

  // Age state variable and function
  const [age, setAge] = useState("null");
  // Age Error state variable and function
  const [ageError, setAgeError] = useState(false);

  // Age state variable Handler
  const ageHandler = () => {
    if (age === "null" || age === false) {
      setAge(true);
      setAgeError(false);
    } else {
      setAge(false);
      setAgeError(true);
    }
  };

  // Terms & Conditions state variable and function
  const [tc, setTc] = useState("null");
  // Terms & Conditions Error state variable and function
  const [tcError, setTcError] = useState(false);

  // Terms & Conditions state variable Handler
  const tcHandler = () => {
    if (tc === "null" || tc === false) {
      setTc(true);
      setTcError(false);
    } else {
      setTc(false);
      setTcError(true);
    }
  };

  // Clear handler
  const clear = () => {
    setFname("");
    setFnameError(false);

    setLname("");
    setLnameError(false);

    setEmail("");
    setEmailError("false");

    setGender(0);
    setGenderError(false);

    setBatch(0);
    setBatchError(false);

    setAge("null");
    setAgeError(false);

    setTc("null");
    setTcError(false);

    setSubmitted(false);
  };

  // Loading state variable and function
  const [loading, setLoading] = useState(false);

  // Submit Response state variable and function
  const [submitted, setSubmitted] = useState(false);

  // Submit Handler
  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    const response = await axios
      .post("http://localhost:8000/register", {
        fname: fname.trim(),
        lname: lname.trim(),
        email: email,
        gender: gender,
        batch: batch,
        month: month,
        year: year
      })
      .then((res) => res.data);

    if (response.code === 400) {
      setEmailError("Email already registered. Enter a new email.");
    } else {
      setSubmitted(true);
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center mt-3 mb-3">
      {!submitted ? (
        <div className={styles.main}>
          <div className="d-flex justify-content-between">
            <h4>Registration Form</h4>
            <b>
              <i>
                {day}/{monthDigit}/{year}
              </i>
            </b>
          </div>
          <div className="mb-3 fw-bold">
            Already Registered? Check details <Link to="/check" style={{fontWeight: "bold"}}>here</Link>
          </div>
          <i>
            This form is for registration to the Yoga classes at{" "}
            <b>DemoYClasses</b> for the month of{" "}
            <b>
              <u>
                {month}, {year}
              </u>
            </b>
            .
          </i>
          <br />
          <b>
            Note : These classes are open only for people in the age range
            between 18-65(both inclusive).
          </b>
          <br /><br />
          <b style={{ color: "red" }}>Monthly Fee : Rs. 500</b>
          <Form className="mt-3" onSubmit={submitHandler}>
            <Row>
              <Col sm={6}>
                <Form.Label>
                  <b>First Name*</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  onChange={fnameHandler}
                  isValid={fname !== "" && !fnameError}
                  isInvalid={fnameError}
                  value={fname}
                />
                <div
                  style={{
                    visibility: fnameError ? "visible" : "hidden",
                    color: "red",
                  }}
                  className="mb-2"
                >
                  <b>Enter a valid First name</b>
                </div>
              </Col>
              <Col sm={6}>
                <Form.Label>
                  <b>Last Name</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  onChange={lnameHandler}
                  isValid={lname !== "" && !lnameError}
                  isInvalid={lnameError}
                  value={lname}
                />
                <div
                  style={{
                    visibility: lnameError ? "visible" : "hidden",
                    color: "red",
                  }}
                  className="mb-2"
                >
                  <b>Enter a valid Last name</b>
                </div>
              </Col>
            </Row>

            <Form.Label>
              <b>Email*</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              onChange={emailHandler}
              isValid={email !== "" && emailError !== "false"}
              isInvalid={emailError !== "false"}
              value={email}
            />
            <div
              style={{
                visibility: emailError !== "false" ? "visible" : "hidden",
                color: "red",
              }}
              className="mb-2"
            >
              <b>{emailError}</b>
            </div>

            <Row>
              <Col sm={6}>
                <Form.Label>
                  <b>Gender*</b>
                </Form.Label>
                <Form.Select
                  onChange={genderHandler}
                  isValid={gender !== 0 && !genderError}
                  isInvalid={genderError}
                  value={gender}
                >
                  <option value="0">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </Form.Select>
                <div
                  style={{
                    visibility: genderError ? "visible" : "hidden",
                    color: "red",
                  }}
                  className="mb-2"
                >
                  <b>Please select gender</b>
                </div>
              </Col>
              <Col sm={6}>
                <Form.Label>
                  <b>Batch*</b>
                </Form.Label>
                <Form.Select
                  onChange={batchHandler}
                  isValid={batch !== 0 && !batchError}
                  isInvalid={batchError}
                  value={batch}
                >
                  <option value="0">Select Batch</option>
                  <option value="1">(1) 6:00 AM - 7:00 AM</option>
                  <option value="2">(2) 7:00 AM - 8:00 AM</option>
                  <option value="3">(3) 8:00 AM - 9:00 AM</option>
                  <option value="4">(4) 5:00 PM - 6:00 PM</option>
                </Form.Select>
                <div
                  style={{
                    visibility: batchError ? "visible" : "hidden",
                    color: "red",
                  }}
                  className="mb-2"
                >
                  <b>Please select batch</b>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={8}>
                <Form.Check
                  type="checkbox"
                  label="I declare that I am in the age range of 18-65 years.*"
                  id="age"
                  style={{ fontWeight: 500 }}
                  onChange={ageHandler}
                  isValid={age !== "null" && !ageError}
                  isInvalid={ageError}
                  checked={age === "null" ? false : age}
                />
                <Form.Check
                  type="checkbox"
                  label="I agree to the terms and conditions.*"
                  id="tc"
                  style={{ fontWeight: 500 }}
                  onChange={tcHandler}
                  isValid={tc !== "null" && !tcError}
                  isInvalid={tcError}
                  checked={tc === "null" ? false : tc}
                />
              </Col>
              <Col lg={4} className="text-center mt-2">
                <Button
                  variant="danger"
                  size="sm"
                  className="m-1"
                  onClick={clear}
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="m-1"
                  disabled={
                    fname === "" ||
                    fnameError ||
                    lnameError ||
                    email === "" ||
                    emailError !== "false" ||
                    gender === 0 ||
                    genderError ||
                    batch === 0 ||
                    batchError ||
                    age === null ||
                    ageError ||
                    tc === null ||
                    tcError ||
                    loading
                  }
                  size="sm"
                >
                  {loading ? "Loading..." : "Register & Pay"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <ToastContainer className="mt-5" position="top-center">
          <Toast>
            <Toast.Header closeButton={false}>
              <h2 className="m-auto">DemoYClasses</h2>
            </Toast.Header>
            <Toast.Header closeButton={false}>
              <h5
                className="m-auto"
                style={{ color: "green", fontWeight: "bold" }}
              >
                REGISTRATION SUCCESSFUL!!!
              </h5>
            </Toast.Header>
            <Toast.Body className="fw-bold">
              <u>Details are as follows:</u>
              <br />
              <br />
              First Name -<b> {fname.trim()}</b>
              <br />
              Last Name -<b> {lname.trim()}</b>
              <br />
              Email -<b style={{ color: "red" }}> {email}</b>
              <br />
              Gender -
              <b>
                &nbsp;
                {gender === "1" && "Male"}
                {gender === "2" && "Female"}
                {gender === "3" && "Others"}
              </b>
              <br />
              Batch -
              <b>
                &nbsp;
                {batch === "1" && "(1) 6:00 AM - 7:00 AM"}
                {batch === "2" && "(2) 7:00 AM - 8:00 AM"}
                {batch === "3" && "(3) 8:00 AM - 9:00 AM"}
                {batch === "4" && "(4) 5:00 PM - 6:00 PM"}
              </b>
              <br />
              Month -
              <b>
                {" "}
                {month}, {year}
              </b>
              <div className="text-center mt-2">
                <h4 style={{ color: "green" }}>Payment Verified ✅</h4>
                <h6>
                  {month}, {year}
                </h6>
              </div>
              <div className="text-center mt-3">
                Please take a print-out of this receipt
              </div>
              <div onClick={clear} className="mt-3 text-center fst-italic" style={{color: "blue", cursor: "pointer"}}>
                <u>Fill a new form</u>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
};

export default Register;
