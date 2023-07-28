import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = function () {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleClick = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <nav className="flex justify-center items-center p-5 bg-black text-white gap-5 fixed top-0 left-0 w-screen text-xl">
      <Link className="focus:text-purple-400" to="/">
        Home
      </Link>
      <Link className="focus:text-purple-400" to="/add-recipe">
        Add recipe
      </Link>
      <Link className="focus:text-purple-400" to="/saved-recipe">
        Saved recipe
      </Link>
      {cookies.access_token ? (
        <button
          onClick={handleClick}
          className="border border-black bg-white px-1 rounded-sm text-black"
        >
          Logout
        </button>
      ) : (
        <Link className="focus:text-purple-400" to="/auth">
          Login/Register
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
