import {Link} from "react-router-dom";

import {Button} from "react-bootstrap";


const Home = () => {
  return (
    <div className="text-center mt-5">
        <h1>
            <u>DemoYClasses</u>
        </h1>
        <h3>Welcome</h3>
        <Link to="/register">
            <Button variant="outline-primary" className="mt-5 fw-bold">
                New User? Register
            </Button>
        </Link>
        <br />
        <Link to="/check">
            <Button variant="outline-danger" className="mt-5 fw-bold">
                Returning User? <b></b>
            </Button>
        </Link>
    </div>
  )
}

export default Home