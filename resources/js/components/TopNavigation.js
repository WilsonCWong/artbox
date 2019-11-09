import React from 'react';
import styled from 'styled-components';
import {
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import axios from 'axios';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { authenticateUser } from "../actions/auth";


function TopNavigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const LogOut = () => {
    axios.post('/logout').then(res => {
      console.log(res);
      dispatch(authenticateUser(false));
      history.push('/login');
    });
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
      <div>
        <Navbar collapseOnSelect expand='sm' fixed='top' bg="light" variant="light">
          <Navbar.Brand href="#home">ArtBox</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Button color='secondary' variant='contained' onClick={LogOut}>Log Out</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
}

export default TopNavigation;