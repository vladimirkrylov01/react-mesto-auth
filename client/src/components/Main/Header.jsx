import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import burgerOpenImg from "../../images/header/burger/burger.svg";
import burgerCloseImg from "../../images/header/burger/close_burger.svg";
import headerLogo from "../../images/header/header__logo.svg";

const Header = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const headerNav = menuOpened
    ? "header__nav header__nav_active"
    : "header__nav";
  const menu = menuOpened ? "menu menu_active" : "menu";
  const menuItem = menuOpened ? "menu__item menu__item_active" : "menu__item";
  const burgerOpen = menuOpened
    ? "header__burger"
    : "header__burger header__burger_active";
  const burgerClose = menuOpened
    ? "header__burger header__burger_active"
    : "header__burger";

  function handleMenuClick() {
    setMenuOpened(!menuOpened);
    props.onSignOut();
  }

  return (
    <header className="header">
      <a target="_self" href="/">
        <img className="header__logo" src={headerLogo} alt="Логотип Mesto" />
      </a>

      <nav className={props.isLogged ? headerNav : ""}>
        <ul className={menu}>
          <Switch>
            {/* ---------- Кнопка Войти ---------- */}
            <Route path="/sign-up">
              <li className="menu__item">
                <Link className="menu__link" to="sign-in">
                  {props.text}
                </Link>
              </li>
            </Route>
            {/* ---------- Кнопка Регистрации ---------- */}
            <Route path="/sign-in">
              <li className="menu__item">
                <Link className="menu__link" to="sign-up">
                  {props.text}
                </Link>
              </li>
            </Route>

            {props.isLogged ? (
              <>
                <li className={menuItem}>{props.email}</li>
                <li className={menuItem}>
                  <span className="menu__link" onClick={handleMenuClick}>
                    {props.text}
                  </span>
                </li>
              </>
            ) : (
              ""
            )}
          </Switch>
        </ul>
      </nav>

      <Route path="/main">
        <button className={burgerOpen} onClick={handleMenuClick}>
          <img src={burgerOpenImg} alt="Бургер" />
        </button>
        <button className={burgerClose} onClick={handleMenuClick}>
          <img src={burgerCloseImg} alt="Бургер" />
        </button>
      </Route>

      {/*<div className="header__wrapper">*/}
      {/*  <Route path="/main">*/}
      {/*    <span>{props.email}</span>*/}
      {/*    {""}*/}
      {/*    <Link className="header__auth-link" to="signin">*/}
      {/*      <p className="header__user">{props.text}</p>*/}
      {/*    </Link>*/}
      {/*  </Route>*/}

      {/*  <Route path="/signup">*/}
      {/*    <Link className="header__auth-link" to="signin">*/}
      {/*      <p className="header__user">{props.text}</p>*/}
      {/*      /!*{props.text}*!/*/}
      {/*    </Link>*/}
      {/*  </Route>*/}

      {/*  <Route path="/signin">*/}
      {/*    <Link className="header__auth-link" to="signup">*/}
      {/*      <p className="header__user">{props.text}</p>*/}
      {/*      /!*{props.text}*!/*/}
      {/*    </Link>*/}
      {/*  </Route>*/}
      {/*</div>*/}
    </header>
  );
};

export default Header;
