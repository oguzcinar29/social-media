// import React, { useContext } from "react";
// import "./App.scss";
// import Navbar from "./Navbar/Navbar";
// import Home from "./Home/Home";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Login from "./Auth/Login";
// import Register from "./Auth/Register";
// import DataContext, { SocialContext } from "./Context/DataContext";

// // i was about to do set file input to get post image see ya!

// export const Router = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Router />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);

// export default function App() {
//   const { user } = useContext(SocialContext);
//   return (
//     <div className="app">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { SocialContext } from "./Context/DataContext";
import UserProfile from "./UserProfile.jsx/UserProfile";

const App = () => {
  const { user } = useContext(SocialContext);

  return (
    <div className="app">
      {user && Object.keys(user).length !== 0 ? (
        <div className="app">
          <AuthenticatedApp />
        </div>
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
};

const AuthenticatedApp = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Other routes for authenticated users */}
          <Route path="/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
};

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Redirect to login if the user tries to access other routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
