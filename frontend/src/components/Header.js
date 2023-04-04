import mestoLogo from "../images/logo_white.svg";
import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onSignOut }) {
  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <header className="header">
      <img className="header__logo" src={mestoLogo} alt="Mesto Logo" />

      <div className="header__container">
        {isLoggedIn && (
          <>
            <address className="header__email">{userEmail}</address>
            <button className="header__button" onClick={handleSignOut}>
              Выйти
            </button>
          </>
        )}

        {!isLoggedIn && (
          <nav>
            <Switch>
              <Route path="/sign-in">
                <NavLink className="header__link" to="/sign-up">
                  Регистрация
                </NavLink>
              </Route>
              <Route path="/sign-up">
                <NavLink className="header__link" to="/sign-in">
                  Войти
                </NavLink>
              </Route>
            </Switch>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
