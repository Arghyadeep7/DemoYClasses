import {Routes, Route, Navigate}  from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Check from "./Check";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/check" element={<Check />} />
      <Route path="*" element = {<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App