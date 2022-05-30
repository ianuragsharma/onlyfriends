import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const { authToken } = useSelector((state) => state.auth);

  return authToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export { RequiresAuth };
