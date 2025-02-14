import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import LoginRoute from "./LoginRoute"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* protected login route */}
      <Route path="/home" element={<LoginRoute><Home /></LoginRoute>}></Route>
    </Routes>
  );
};

export default AppRoutes;