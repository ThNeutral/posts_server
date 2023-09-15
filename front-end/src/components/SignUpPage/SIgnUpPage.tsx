import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { apiKeyKey } from "../../exports/consts";
import { homePagePath } from "../../exports/pathnames";

type StateOfSubmitType = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";
type IsValidInputType = {
  isWrongEmail: boolean;
  isWrongPassword: boolean;
};
type ValidityActionsTypes =
  | "CHANGE_VALIDITY_OF_PASSWORD"
  | "CHANGE_VALIDITY_OF_EMAIL";

type ValidityAction = { payload: boolean; type: ValidityActionsTypes };

type CreateUserResponse = {
  api_key: string;
  token_type: "Bearer";
};

const emailTestRegex = /(.+)@(.+){2,}\.(.+){2,}/;

const initIsValidInput: IsValidInputType = {
  isWrongEmail: false,
  isWrongPassword: false,
};

function isValidInputReducer(
  state: IsValidInputType,
  action: ValidityAction
): IsValidInputType {
  switch (action.type) {
    case "CHANGE_VALIDITY_OF_PASSWORD":
      return { ...state, isWrongPassword: action.payload };
    case "CHANGE_VALIDITY_OF_EMAIL":
      return { ...state, isWrongEmail: action.payload };
  }
}

export default function SignUpPage() {
  const [stateOfSubmit, setStateOfSubmit] = useState<StateOfSubmitType>("IDLE");
  const [isInvalidInput, dispatchIsInvalidInput] = useReducer(
    isValidInputReducer,
    initIsValidInput
  );
  const navigate = useNavigate();

  async function signUpFormConfirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStateOfSubmit("IDLE");
    dispatchIsInvalidInput({
      payload: false,
      type: "CHANGE_VALIDITY_OF_EMAIL",
    });
    dispatchIsInvalidInput({
      payload: false,
      type: "CHANGE_VALIDITY_OF_PASSWORD",
    });
    let valid = true;
    if (!emailTestRegex.test(e.target[1].value)) {
      valid = false;
      dispatchIsInvalidInput({
        payload: true,
        type: "CHANGE_VALIDITY_OF_EMAIL",
      });
    }
    if (e.target[2].value != e.target[3].value) {
      valid = false;
      dispatchIsInvalidInput({
        payload: true,
        type: "CHANGE_VALIDITY_OF_PASSWORD",
      });
    }
    if (valid) {
      const body = {
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/create-user`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      if (response.status === 201) {
        const json = (await response.json()) as CreateUserResponse;
        localStorage.setItem(apiKeyKey, json.api_key);
        setStateOfSubmit("SUCCESS");
        navigate(homePagePath)
      } else {
        setStateOfSubmit("FAILURE");
      }
    }
  }
  return (
    <div className="signup">
      <form className="signup-form" onSubmit={signUpFormConfirm}>
        <h3>Sign up on our blogpost!</h3>
        <p className="signup-form-paragraph">Enter username</p>
        <input className="signup-form-input" type="text" />
        <p className="signup-form-paragraph">Enter email</p>
        {isInvalidInput.isWrongEmail ? (
          <p className="signup-form-paragraph signup-form-paragraph-invalid">
            Invalid email
          </p>
        ) : null}
        <input
          className={`signup-form-input${
            isInvalidInput.isWrongEmail ? " signup-form-input-invalid" : ""
          }`}
          type="email"
        />
        <p className="signup-form-paragraph">Enter password</p>
        {isInvalidInput.isWrongPassword ? (
          <p className="signup-form-paragraph signup-form-paragraph-invalid">
            Passwords should match
          </p>
        ) : null}
        <input
          className={`signup-form-input${
            isInvalidInput.isWrongPassword ? " signup-form-input-invalid" : ""
          }`}
          type="password"
        />
        <p className="signup-form-paragraph">Confirm password</p>
        {isInvalidInput.isWrongPassword ? (
          <p className="signup-form-paragraph signup-form-paragraph-invalid">
            Passwords should match
          </p>
        ) : null}
        <input
          className={`signup-form-input${
            isInvalidInput.isWrongPassword ? " signup-form-input-invalid" : ""
          }`}
          type="password"
        />
        <button className="signup-form-button" type="submit">
          {stateOfSubmit === "IDLE"
            ? "Sign up!"
            : stateOfSubmit === "LOADING"
            ? "Fetching..."
            : "Failed to create user"}
        </button>
      </form>
    </div>
  );
}
