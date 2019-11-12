import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import axios from 'axios';
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import { authenticateUser } from "../actions/auth";
import { updateUser } from "../actions/user";
import { showNav } from "../actions/ui";

const dropdownCss = css`
  .dropdown-toggle::after {
    display: none;
  }
  
  a.dropdown-toggle.nav-link {
    padding: 0;
  }
  
  .dropdown-menu {
    right: 0;
    left: auto;
  }
  
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 0;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-height: 40px;
  padding: 0px 8px;
`;

const VerticalDivider = styled.span`
  margin-left:12px;
  margin-right:12px;
  width:1px;
  border-left:1px solid gray;
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

function TopNavigation() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(showNav(false));
    }
  }, []);

  const Logout = () => {
    axios.post('/logout').then(res => {
      dispatch(updateUser(null));
      dispatch(authenticateUser(false));
      history.push('/login');
    });
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    dispatch(showNav(false))
    return null;
  } else {
    dispatch(showNav(true));
  }

  const dropdownDisplay = () => {
      return (
      <UserContainer>
        <UserAvatar src={ (user?.profile_picture) ? `/storage${user?.profile_picture}` : '/images/user_placeholder.png' } />
      </UserContainer>
    )
  };

  const renderDropdown = () => {
    return (
      <NavDropdown css={dropdownCss} title={ dropdownDisplay() } id="nav-dropdown">
        <NavDropdown.Item as={Link} to={`/profile/${user?.username || ''}`}>Profile</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    )
  }

  return (
      <div>
        <Navbar collapseOnSelect expand='sm' fixed='top' bg="light" variant="light">
          <Navbar.Brand as={Link} to='/'>ArtBox</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              { renderDropdown() }
              <VerticalDivider/>
              <Nav.Link as={Link} to="/posts/create">Create Post</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
}

export default TopNavigation;