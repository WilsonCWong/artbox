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
  margin-bottom: 100px;
  color: #474747;
  font-family: "Nunito", "Roboto", "Helvetica", "Arial", sans-serif;
`

function NoMatch() {
  return (
    <Container>
      <img src='/images/sad_hamster.gif' />
      <Message>
        404 | Page Not Found
      </Message>
    </Container>
  )
}

export default NoMatch;