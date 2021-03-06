import React, {useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button, Paper, Avatar } from '@material-ui/core';
import AlertsDisplay from "@/components/Error/AlertsDisplay";
import axios from 'axios';
import { updateUser } from "../../actions/user";
import { useFlash } from "@/hooks/useFlash";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 64px);
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
`;

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
  padding: 40px 40px 10px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 20%;
  margin-right: auto;
  margin-bottom: 0;
  text-align: right;
  vertical-align: baseline;
`;

const Input = styled.input`
  width: 70%;
`;

const AvatarPreview = styled(Avatar)`
  && {
    width: 60px;
    height: 60px;
    margin-left: 20px;
    margin-right: auto;
  }
  
  &&:hover {
    cursor: pointer;
  }
`;

const UploadInput = styled.input`
  display: none;
`

const UsernameHeader = styled.h2`
  font-size: 18px;
  font-weight: 500;
`

const UploadWrapper = styled.div`
  width: 70%;
`

const UploadLink = styled.a`
  &&&, &&&:hover {
    color: #3897f0;
    cursor: pointer;
  }
`;

function Settings() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPicture, setCurrentPicture] = useState(user?.profile_picture || false);
  const [profilePicture, setProfilePicture] = useState(null);
  const profilePicBlob = useRef(null);
  const profilePicUploadRef = useRef(null);

  const { messages, messageType, setMessages, removeMessage } = useFlash();

  const openUploadDialog = e => {
    profilePicUploadRef.current.click();
  };

  const handleFileChange = e => {
    if (!e.target.files[0]) return
    // We might need to create this object URL on unmount, not sure if it will cause memory leak or not
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
    profilePicBlob.current = e.target.files[0];
  };

  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('_method', 'PATCH');
    formData.append('username', username);
    formData.append('email', email);
    if (profilePicBlob.current) {
      formData.append('profile_picture', profilePicBlob.current);
    }

    axios.post('/web_api/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      dispatch(updateUser(res.data.user));
      setMessages({m:'Your account has been updated.'}, 'success');
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
          <Wrapper>
            <Control>
              <AvatarPreview
                onClick={ openUploadDialog }
                src={
                  profilePicture ||
                  ((currentPicture) ? `/storage${currentPicture}` : '/images/user_placeholder.png')
                }
              />
              <UploadWrapper>
                <UsernameHeader>{ user?.username || '' }</UsernameHeader>
                <UploadLink onClick={ openUploadDialog }>Change Profile Picture</UploadLink>
                <UploadInput
                  ref={profilePicUploadRef}
                  id="profile_picture"
                  type="file"
                  name="profile_picture"
                  onChange={ handleFileChange }
                  accept=".jpeg,.png,.jpg,.gif,.webp"
                />
              </UploadWrapper>
            </Control>
            <Control>
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </Control>
            <Control>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Control>
            <Control>
              <Button fullWidth type='submit' variant="contained" color="primary">Update</Button>
            </Control>
            <AlertsDisplay messages={messages} variant={messageType} onClose={removeMessage} />
          </Wrapper>
        </StyledForm>
      </ResponsivePaper>
    </Container>
  )
}

export default Settings;