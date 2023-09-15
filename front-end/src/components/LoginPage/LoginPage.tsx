import { useState } from "react";
import { apiKeyKey } from "../../exports/consts";
import { useNavigate } from "react-router";
import { homePagePath } from "../../exports/pathnames";

type LoginUserResponse = {
  api_key: string;
  token_type: "Bearer";
};

export default function LoginPage() {
  const [areCorrectCredentials, setAreCorrectCredentials] = useState(true);
  const navigate = useNavigate();

  async function loginFormSubmitHandler(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    const loginJSON = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/login-user`,
      {
        method: "POST",
        body: JSON.stringify(loginJSON),
      }
    );
    const json = (await response.json()) as LoginUserResponse;
    if (response.status === 200) {
      setAreCorrectCredentials(true);
      localStorage.setItem(apiKeyKey, json.api_key);
      navigate(homePagePath);
    } else {
      setAreCorrectCredentials(false);
    }
  }
  return (
    <div className="login" onSubmit={loginFormSubmitHandler}>
      <form className="login-form">
        <h3>Login to our blogpost!</h3>
        {!areCorrectCredentials ? (
          <h4 className="login-form-header-incorrect">
            Incorrect username or password!
          </h4>
        ) : null}
        <p className="login-form-paragraph">Username:</p>
        <input className="login-form-input" type="text" />
        <p className="login-form-paragraph">Password:</p>
        <input className="login-form-input" type="password" />
        <button type="submit" className="login-form-button">
          Login!
        </button>
      </form>
    </div>
  );
}
