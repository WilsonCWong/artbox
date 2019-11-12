import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Container,
} from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import { valuesIn } from "lodash-es";
import {useSelector} from "react-redux";

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const RegisterLabel = styled.h1`
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 3em;
  width: 200px;
  margin-right: 10px;
`;

const FullHeightContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  min-width: 475px;
  max-width: 600px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: auto;
  margin-bottom: 0;
  text-align: left;
  vertical-align: baseline;
`;

const Input = styled.input`
  width: 70%;
`;


function Login() {
  const [canRender, setCanRender] = useState(false);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const authenticated = useSelector(state => state.auth.authenticated);
  let history = useHistory();

  useEffect(() => {
    if (authenticated) {
      setCanRender(false);
    } else {
      setCanRender(true);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/register', { username, email, password, 'password_confirmation': confirmPassword }, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        history.push('/login');
      })
      .catch(err => {
        (err.response.status === 500) ?
          setErrors(valuesIn({server: 'A server error has occurred.'}))
          : setErrors(valuesIn(err.response.data.errors));
      });
  };

  const renderErrors = errs => {
      return (
        <>
            {errs.map(e => {
              return (
                <Alert key={e} variant='danger' onClose={() => setErrors(errors.filter(v => v !== e))} dismissible>
                  { e }
                </Alert>
              );
            })}
        </>
      );
  }

  if (!canRender) return null;

  return (
    <FullHeightContainer maxWidth='lg'>
      <LabelContainer>
        <RegisterLabel>Register</RegisterLabel>
      </LabelContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Wrapper>
          <Control>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
          </Control>
          <Control>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Control>
          <Control>
              <Label htmlFor="password">Password</Label>
              <Input id="password" pattern=".{8,}" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Control>
          <Control>
            <Label htmlFor="password-confirm">Confirm Password</Label>
            <Input id="password-confirm" pattern=".{8,}" type="password" name="password-confirm" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </Control>
          <Control>
            <Button fullWidth type='submit' variant="contained" color="primary">Register</Button>
          </Control>
          { (errors.length) ? renderErrors(errors) : null }
        </Wrapper>
      </StyledForm>
    </FullHeightContainer>
  )
}

export default Login;
