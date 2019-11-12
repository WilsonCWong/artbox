import React, {useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button, Paper, TextField } from '@material-ui/core';
import { Alert } from "react-bootstrap";
import axios from 'axios';
import { valuesIn } from "lodash-es";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 85vh;
  margin: 40px;
  justify-content: center;
  align-items: center;
`;

const ResponsivePaper = styled(Paper)`
  width: 500px;
`;

function ViewPost() {
  const [errors, setErrors] = useState([]);

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

  return (
    <Container>
      <ResponsivePaper>
      </ResponsivePaper>
    </Container>
  )
}

export default ViewPost;