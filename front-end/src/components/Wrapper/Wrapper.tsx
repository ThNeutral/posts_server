import { apiKeyKey, pageIconURL } from "../../exports/consts";
import { Outlet, useNavigate } from "react-router";
import {
  homePagePath,
  loginPagePath,
  signUpPagePath,
} from "../../exports/pathnames";

export default function Wrapper() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="header-content-left">
            <img
              className="header-content-left-icon"
              onClick={() => navigate(homePagePath)}
              src={pageIconURL}
            />
            <button
              className="header-content-left-button"
              onClick={() => navigate(homePagePath)}
              type="button"
            >
              Posts
            </button>
            <button
              className="header-content-left-button"
              onClick={() => navigate(homePagePath)}
              type="button"
            >
              Your posts
            </button>
            <button
              className="header-content-left-button"
              onClick={() => navigate(homePagePath)}
              type="button"
            >
              Create post
            </button>
          </div>
          <div className="header-content-right">
            <input className="header-content-right-search"></input>
            {!localStorage.getItem(apiKeyKey) ? (
              <>
                <button
                  className="header-content-right-button"
                  onClick={() => navigate(loginPagePath)}
                  type="button"
                >
                  Login
                </button>
                <button
                  className="header-content-right-button"
                  onClick={() => navigate(signUpPagePath)}
                  type="button"
                >
                  Sign up
                </button>
              </>
            ) : (
              <button
                className="header-content-right-button"
                onClick={() => {
                  localStorage.removeItem(apiKeyKey);
                  navigate(homePagePath);
                }}
                type="button"
              >
                Log out
              </button>
            )}
          </div>
        </div>
        <hr className="header-hr" />
      </div>
      <Outlet />
    </>
  );
}
