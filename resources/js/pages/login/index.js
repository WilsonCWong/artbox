import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
  Container,
  Checkbox,
} from '@material-ui/core';
import AlertsDisplay from "@/components/Error/AlertsDisplay";
import { authenticateUser } from "@/actions/auth";
import { updateUser } from "@/actions/user";
import { useFlash } from "@/hooks/useFlash";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`

const Logo = styled.img`
  max-height: 50px;
  margin-right: 10px;
`;

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
  height: 95vh;
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
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { messages, messageType, setMessages, removeMessage } = useFlash();

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
    axios.post('/login', { login, password, remember }, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatch(updateUser(res.data.user));
        dispatch(authenticateUser(true));
        history.push('/');
      })
      .catch(err => {
        (err.response.status === 500) ?
          setMessages({server: 'A server error has occurred.'})
          : setMessages(err.response.data.errors);
      });
  };

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
              <Label htmlFor="login">Email / Username</Label>
              <Input id="login" type="text" name="login" value={login} onChange={e => setLogin(e.target.value)} required />
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
            Don't have an account? <Link to='/register'>Register here.</Link>
          </p>
          <AlertsDisplay messages={messages} variant={messageType} onClose={removeMessage} />
        </Wrapper>
      </StyledForm>
    </FullHeightContainer>
  )
}

export default Login;
