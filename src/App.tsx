import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import RequireAuth from "./routes/Auth/RequireAuth";
import HomePage from "./routes/Home";
import Layout from "./routes/Layout";
import LoginPage from "./routes/Login";
import ProfilePage from "./routes/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
