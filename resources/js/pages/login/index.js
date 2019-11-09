import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Checkbox,
} from '@material-ui/core';
import {Alert} from "react-bootstrap";
import {valuesIn} from "lodash-es";
import { authenticateUser } from "../../actions/auth";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`

const Logo = styled.img`
  max-height: 50px;
  margin-right: 10px;
`

const SiteLabel = styled.h1`
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
  max-width: 450px;
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

const RememberLabel = styled(Label)`
  margin-right: 5px;
`;

const Input = styled.input`
  width: 70%;
`;



function Login() {
  const [canRender, setCanRender] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const authenticated = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      setCanRender(false);
    } else {
      setCanRender(true);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/login', { email, password, remember }, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        console.log(res);

        dispatch(authenticateUser(true));
        history.push('/');
      })
      .catch(err => {
        setErrors(valuesIn(err.response.data.errors));
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
      <LogoContainer>
        <Logo src="/images/logo.svg" />
        <SiteLabel>ArtBox</SiteLabel>
      </LogoContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Wrapper>
          <Control>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Control>
          <Control>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Control>
          <Control>
              <RememberLabel htmlFor="remember">Remember Me</RememberLabel>
              <Checkbox id="remember" type="checkbox" name="remember" checked={remember} onChange={e => setRemember(e.target.checked)} />
          </Control>
          <Control>
            <Button fullWidth type='submit' variant="contained" color="primary">Log In</Button>
          </Control>
          <p>
            Don't have an account? <a href='/register'>Register here.</a>
          </p>
          { (errors.length) ? renderErrors(errors) : null }
        </Wrapper>
      </StyledForm>
    </FullHeightContainer>
  )
}

export default Login;
