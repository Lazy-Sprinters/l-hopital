import React, { Component } from "react";
import "../App.css";
import LoginHeroContainer from "./LoginHeroContainer";
import LoginCard from "./LoginCard";
import AddDoc from "./AddDoc";
import ViewDoc from "./ViewDoc";
import DeleteDoc from "./DeleteDoc";
import LoginNavbar from "./LoginNavbar";
import Footer from "./Footer";

export class LoginHome extends Component {
  state = {
    step: 0,
  };

  NavHome = () => {
    this.setState({ step: 0 });
  };

  NavAdd = () => {
    this.setState({ step: 1 });
  };

  NavView = () => {
    this.setState({ step: 2 });
  };

  NavDelete = () => {
    this.setState({ step: 3 });
  };

  render() {
    const { step } = this.state;

    const { userInfo, userValues, handleLogout } = this.props;

    switch (step) {
      case 0:
        return (
          <div>
            <LoginNavbar
              userValues={userValues}
              handleLogout={handleLogout}
              NavHome={this.NavHome}
              NavAdd={this.NavAdd}
              NavView={this.NavView}
              NavDelete={this.NavDelete}
            />
            <LoginCard
              NavAdd={this.NavAdd}
              NavView={this.NavView}
              NavDelete={this.NavDelete}
            />
            <Footer />
          </div>
        );
      case 1:
        return (
          <div>
            <LoginNavbar
              userValues={userValues}
              handleLogout={handleLogout}
              NavHome={this.NavHome}
              NavAdd={this.NavAdd}
              NavView={this.NavView}
              NavDelete={this.NavDelete}
            />
            <AddDoc userInfo={userInfo} />
            <Footer />
          </div>
        );
      case 2:
        return (
          <div>
            <LoginNavbar
              userValues={userValues}
              handleLogout={handleLogout}
              NavHome={this.NavHome}
              NavAdd={this.NavAdd}
              NavView={this.NavView}
              NavDelete={this.NavDelete}
            />
            <ViewDoc userInfo={userInfo} />
            <Footer />
          </div>
        );
      case 3:
        return (
          <div>
            <LoginNavbar
              userValues={userValues}
              handleLogout={handleLogout}
              NavHome={this.NavHome}
              NavAdd={this.NavAdd}
              NavView={this.NavView}
              NavDelete={this.NavDelete}
            />
            <DeleteDoc userInfo={userInfo} />
            <Footer />
          </div>
        );
    }
  }
}

export default LoginHome;
