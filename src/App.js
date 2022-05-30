import { Login } from "features";
import { RequiresAuth } from "features/Auth/components/RequiresAuth";
import { HomePage, LandingPage } from "pages";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/signup" exact element={<LandingPage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route
          path="/home"
          element={
            <RequiresAuth>
              <HomePage />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
