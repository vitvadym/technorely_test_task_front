import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CompanyDetail from "./pages/CompanyDetail";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SIgnUp";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import CreateCompany from "./pages/CreateCompany";
import AdminView from "./AdminView";
import ProtectedRoute from "./AdminView/ProtectedRoute";
import Users from "./AdminView/pages/Users";
import Companies from "./AdminView/pages/Companies";
import EditCompany from "./pages/EditCompany";
import EditUser from "./pages/EditUser";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<Home />}
            />
            <Route
              path="profile/:id"
              element={<Profile />}
            />
            <Route
              path="profile/edit/:id"
              element={<EditUser />}
            />
            <Route
              path="company/:id"
              element={<CompanyDetail />}
            />
            <Route
              path="company/create"
              element={<CreateCompany />}
            />
            <Route
              path="company/edit/:id"
              element={<EditCompany />}
            />

            <Route
              path="search"
              element={<SearchResult />}
            />

            <Route
              path="signup"
              element={<SignUp />}
            />
            <Route
              path="signin"
              element={<SignIn />}
            />

            <Route element={<ProtectedRoute />}>
              <Route
                path="dashboard"
                element={<AdminView />}
              >
                <Route
                  path="users"
                  element={<Users />}
                />
                <Route
                  path="companies"
                  element={<Companies />}
                />
              </Route>
            </Route>

            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 2000 }}
        />
      </BrowserRouter>
    </>
  );
};

export default App;
