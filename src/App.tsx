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
import AuthGuard from "./routes/Auth/AuthGuard";
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
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard adminRoute={true}>
                <ProfilePage />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
