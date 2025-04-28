import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPath";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔥 get token

        if (!token) {
          clearUser();
          navigate("/login");
          return;
        }

        const response = await axios.get(BASE_URL + API_PATHS.AUTH.GET_USER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 pass token in Authorization header
          },
        });

        console.log("response hook", response);

        if (isMounted && response.data) {
          updateUser(response.data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        clearUser();
        navigate("/login");
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};

export default useUserAuth;
