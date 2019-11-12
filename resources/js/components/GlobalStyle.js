import React from 'react';
import { useSelector } from "react-redux";
import { createGlobalStyle } from 'styled-components'

const GlobalStyleComp = createGlobalStyle`
  body {
    padding-top: ${props => props.navShowing ? '56px' : '0px'};
  }

  .grid-item { width: 20%; }
  
  .grid-item {
    float: left;
  }
`

export function GlobalStyle() {
  const navShowing = useSelector(state => state.ui.navShowing);

  const globStyleProps = {
    navShowing,
  }

  return (
    <GlobalStyleComp {...globStyleProps} />
  )
}

