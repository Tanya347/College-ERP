// CSS
import "./style/dark.scss";
import "./style/base.scss";

// React Stuff
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { DarkModeContext } from "./config/context/darkModeContext";

// Common Pages
import Login from "./pages/login/Login";
import Landing from "./pages/Landing/Landing";
import AdminRoutes from "./source/routes/AdminRoutes";
import FacultyRoutes from "./source/routes/FacultyRoutes";
import StudentRoutes from "./source/routes/StudentRoutes";
import { AuthContext } from "./config/context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  const LoggedIn = ({ children }) => {
    if (user) {
      if (user.isAdmin) return <Navigate to="/admin" />;
      else if (user.isFaculty) return <Navigate to="/faculty" />;
      else if (user.isStudent) return <Navigate to="/student" />;
    } else return children;
  };

  return (
    // darkmode context
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoggedIn><Landing /></LoggedIn>} />
          <Route path="/adminLogin" element={<LoggedIn><Login type="Admin" /></LoggedIn>} />
          <Route path="/facultyLogin" element={<LoggedIn><Login type="Faculty" /></LoggedIn>} />
          <Route path="/studentLogin" element={<LoggedIn><Login type="Student" /></LoggedIn>} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Faculty Routes */}
          <Route path="/faculty/*" element={<FacultyRoutes />} />

          {/* Student Routes */}
          <Route path="student/*" element={<StudentRoutes />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
