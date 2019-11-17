import React, {useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { Button, Paper, TextField } from '@material-ui/core';
import AlertsDisplay from "@/components/Error/AlertsDisplay";
import axios from 'axios';
import { useFlash } from "@/hooks/useFlash";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 64px);
  margin-left: 40px;
  margin-right: 40px;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h1`
  margin: 20px 0px;
  font-size: 2em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`

const ResponsivePaper = styled(Paper)`
  width: 500px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0px 40px 20px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const PreviewContainer = styled.div`
  width: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
`;

const FullTextField = styled(TextField)`
  width: 100%;
  
  && {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

function CreatePost() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreview] = useState(null);
  const previewBlob = useRef(null);
  const previewUploadRef = useRef(null);

  const { messages, setMessages, dispatchMessages, removeMessage } = useFlash();

  const openUploadDialog = e => {
    previewUploadRef.current.click();
  };

  const handleFileChange = e => {
    if (!e.target.files[0]) return
    // We might need to create this object URL on unmount, not sure if it will cause memory leak or not
    setPreview(URL.createObjectURL(e.target.files[0]));
    previewBlob.current = e.target.files[0];
  };

  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('post_image', previewBlob.current);


    axios.post('/web_api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      URL.revokeObjectURL(previewImage);
      setPreview(null);
      previewBlob.current = null;
      setTitle('');
      setDescription('');
      dispatchMessages({m: 'Post was successfully created.'}, 'success');
      history.push(`/posts/${res.data.post_id.toString(16)}`);
    })
      .catch(err => {
        (err.response.status === 500) ?
          setMessages({server: 'A server error has occurred.'})
          : setMessages(err.response.data.errors);
      });
  };

  return (
    <Container>
      <ResponsivePaper>
        <StyledForm onSubmit={ handleSubmit }>
          <FormTitle>Create Post</FormTitle>
          <Wrapper>
            <PreviewContainer>
              <ImagePreview src={ previewImage || '/images/image_placeholder.jpg' } />
            </PreviewContainer>
            <Control css={'margin-bottom: 30px;'}>
              <Button fullWidth onClick={ openUploadDialog } variant="contained" color="primary">Upload Image</Button>
              <UploadInput ref={ previewUploadRef } id="post_image" type="file" name="post_image" onChange={ handleFileChange } />
            </Control>
            <Control>
              <FullTextField
                label='Title'
                variant='outlined'
                margin='normal'
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Write your title here...'
                required
              />
            </Control>
            <Control>
              <FullTextField
                label='Description'
                multiline
                variant='outlined'
                inputProps={{maxLength: 200}}
                margin='normal'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Write your description here...'
              />
            </Control>
            <Control>
              <Button fullWidth type='submit' variant="contained" color="primary">Create Post</Button>
            </Control>
            <AlertsDisplay messages={messages} onClose={removeMessage} />
          </Wrapper>
        </StyledForm>
      </ResponsivePaper>
    </Container>
  )
}

export default CreatePost;