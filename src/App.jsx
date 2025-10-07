import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/home/Footer";
const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
