import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Message = styled.h1`
  margin-top: 20px;
  margin-bottom: 100px;
  color: #474747;
  font-family: "Nunito", "Roboto", "Helvetica", "Arial", sans-serif;
`

function Unauthorized() {
  return (
    <Container>
      <img css='width: 300px;' src='/images/no.gif' />
      <Message>
        403 | You are not authorized to access this resource.
      </Message>
    </Container>
  )
}

export default Unauthorized;