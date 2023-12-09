import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;
  a {
    text-decoration: none;
  }
  li {
    color:white;
    margin: 0 0.8rem;
    font-size: 1.1rem;
    position: relative;
    list-style: none;
  }

  a.active {
    li {
      border-bottom: 2px solid white;
    }
  }

 
  }
`;

const links = [
  { name: "Home", path: "/" },
  { name: "User", path: "/user" },
];

const Nav = () => {
  return (
    <NavUnlisted className="p-2 bg-[#2ed742] h-[90px] flex items-center 320px:justify-between 400px:justify-end md:justify-end gap-6 fixed z-50 top-0 w-full shadow-lg">
      {links.map((link, index) => (
        <NavLink
          className="text-base w-[80px] md:w-[100px] h-[50px] md:h-[50px] bg-[#000] text-yellow-50 rounded-lg shadow-lg flex items-center justify-center font-semibold mr-2 ml-2"
          key={index}
          to={link.path}
        >
          <li>{link.name}</li>
        </NavLink>
      ))}
    </NavUnlisted>
  );
};

export default Nav;
