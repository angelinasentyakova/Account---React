import { Field, reduxForm } from "redux-form";
import { Input } from "../../Common/FormControls/FormControls";
import { required } from "../../Utils/Validators/Validators";
import "./Login.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          validate={[required]}
          placeholder={"Email"}
          name={"email"}
          component={Input}
          className="login-input"
        />
      </div>
      <div>
        <Field
          validate={[required]}
          placeholder={"Password"}
          name={"password"}
          type={"password"}
          component={Input}
          className="login-input"
        />
      </div>
      <div>
        <Field type={"checkbox"} name={"remeberMe"} component={Input} className="login-input" />
        Remeber me
      </div>
      {captchaUrl && <img src={captchaUrl}></img>}
      {captchaUrl && (
        <Field
          validate={[required]}
          placeholder={"Insert captcha"}
          component={Input}
          name={"captcha"}
        />
      )}
      {error && <div className="form-error-message">{error}</div>}
      <div>
        <button className="login-button">Log in</button>
      </div>
    </form>
  );
};

export const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

export default LoginForm;
