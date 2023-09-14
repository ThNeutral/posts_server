import { pageIconURL } from "../../exports/consts";
import { Outlet, useNavigate } from "react-router";

export default function Wrapper() {
  const navigate = useNavigate();
  return (
    <>
    <div className="header">
      <div className="header-content">
        <div className="header-content-left">
          <img
            className="header-content-left-icon"
            onClick={() => navigate("/")}
            src={pageIconURL}
          />
          <button
            className="header-content-left-button"
            onClick={() => navigate("/")}
            type="button"
          >
            Posts
          </button>
          <button
            className="header-content-left-button"
            onClick={() => navigate("/")}
            type="button"
          >
            Your posts
          </button>
          <button
            className="header-content-left-button"
            onClick={() => navigate("/")}
            type="button"
          >
            Create post
          </button>
        </div>
        <div className="header-content-right">
          <input className="header-content-right-search">

          </input>
          <button
            className="header-content-right-button"
            onClick={() => navigate("/")}
            type="button"
          >
            Login
          </button>
          <button
            className="header-content-right-button"
            onClick={() => navigate("/sign-up")}
            type="button"
          >
            Sign up
          </button>
        </div>
      </div>
      <hr className="header-hr" />
    </div>
    <Outlet />
    </>
  );
}
