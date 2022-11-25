import { Routes, Route } from "react-router-dom";
import AdminPage from "./routes/Admin";
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
                <AdminPage />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
