import { connect } from "react-redux";
import { Redirect } from "react-router";
import { loginThunkCreator } from "../../Redux/authReducer";
import "./Login.css";
import { LoginReduxForm } from "./LoginForm";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }
  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }
  return (
    <div className='login-wrapper'>
    <h1 className='login-title'>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
  </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login: loginThunkCreator})(Login);

