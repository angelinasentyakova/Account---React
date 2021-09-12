import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import "./App.css";
import Preloader from "./Common/Preloader/Preloader";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import Transactions from "./Components/Transactions/Transactions";
import { inititalizeThunkCreator } from "./Redux/appReducer";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeThunk();
  }
  render() {
    if (!this.props.initialized) return <Preloader/>
    return (
      <div className="app-wrapper">
        <Header />
        <main>
          <div className="main-content-wrapper">
            <Route path="/login" render={() => <Login />} />
            <Route path="/profile" render={() => <ProfileContainer />} />
            <Route path="/transactions" render={() => <Transactions />} />
            <Route exact path="/" render={() => <Login />} />
          </div>
        </main>
        <Footer />
      </div>
    )
  };
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeThunk: inititalizeThunkCreator })
  (App);

