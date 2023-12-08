import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;
  a {
    text-decoration: none;
  }
  li {
    color: black;
    margin: 0 0.8rem;
    font-size: 1.1rem;
    position: relative;
    list-style: none;
  }

  a.active {
    li {
      border-bottom: 2px solid black;
    }
  }

 
  }
`;

const links = [
  { name: "Home", path: "/sectors" },
  { name: "User", path: "/user" },
];

const Nav = () => {
  return (
    <NavUnlisted className="p-2 bg-green-400 h-[90px] flex items-center 320px:justify-between 400px:justify-end md:justify-end gap-6 fixed top-0 w-full">
      {links.map((link, index) => (
        <NavLink
          className="text-base w-[80px] md:w-[100px] h-[50px] md:h-[50px] bg-slate-50 rounded-lg shadow-lg flex items-center justify-center font-semibold mr-2 ml-2"
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
