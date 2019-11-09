import React from "react";
import styled from "styled-components";

const Paragraph = styled.p`
margin-top: 200px;
margin-left: 200px;
`


function Home() {
  return (
    <Paragraph>
      This is a home page!
    </Paragraph>
  )
}

export default Home;