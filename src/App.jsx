import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/home/Footer";
import AIBotWidget from "./components/AIBotWidget";
const App = () => {
  return (
    <>
      <Outlet />
      <AIBotWidget className="fixed bottom-4 right-4 z-50" />
    </>
  );
};

export default App;

 
