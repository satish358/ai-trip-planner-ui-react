import { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      {currentPage == "login" && <LoginPage pageSetter={setCurrentPage} />}
      {currentPage == "home" && <HomePage pageSetter={setCurrentPage} />}
    </>
  );
}

export default App;
