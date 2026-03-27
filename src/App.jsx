import { Routes, Route } from "react-router-dom";
import Display from "./pages/Display";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Display />} />

      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
