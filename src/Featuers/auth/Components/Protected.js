import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { UserSelector } from "../AuthSlice";

const Protected = ({ children }) => {
  const userInfo = useSelector(UserSelector);

  if (!userInfo) {
    return <Navigate to="/Login" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
