import React from "react";

import { Nav, NavLink, NavMenu } from "./NavbarStyled.js";

export const Navbar = (id) => {
  return (
    <Nav>
      <NavMenu>
        <NavLink to={`/collections`} activateStyle>
          Collections
        </NavLink>
        <NavLink to={`/collections/create`} activateStyle>
          Create New Fragrance
        </NavLink>
        <NavLink to={`/my-collection`} activateStyle>
          My Fragrances
        </NavLink>
        <NavLink to="/" activateStyle>
          Log Out
        </NavLink>
      </NavMenu>
    </Nav>
  );
};
