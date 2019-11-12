import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { Avatar, Tabs, Tab, Paper } from "@material-ui/core";
import Masonry from 'react-masonry-component';

const masonryStyle = css`
  max-width: 100vw;
  background-color: #fbfbfb;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
  background-color: #fbfbfb;
`;

const Header =  styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-image: url("/images/cover.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const UserAvatar = styled(Avatar)`
  && {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const UsernameDisplay = styled.h1`
  font-size: 2em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,.37);
  color: #2d2d2d;
`;

const GridImage = styled.img`
  display: block;
  width: 100%;
`

function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/web_api/profile/${ username }`, {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  const imagesLoaded = loadedInstance => {
    console.log(loadedInstance);
  }

  const handleLayoutComplete = laidOutItems => {
    console.log(laidOutItems);
  }

  if (!user) return null;

  const gridItems = user.posts.map(post => {
      return (
        <div key={post.id} className="grid-item">
          <Link to={`/posts/${post.id.toString(16)}`}>
          <GridImage src={`/storage${post.media[0].content_url}`} />
          </Link>
        </div>
      );
    });

  return (
    <Container>
      <Header>
        <UserInfo>
          <UserAvatar src={ (user?.profile_picture) ? `/storage${user?.profile_picture}` : '/images/user_placeholder.png' } />
          <UsernameDisplay>{ user?.username || '' }</UsernameDisplay>
        </UserInfo>
      </Header>
      <Paper square>
        <Tabs
          value={ tab }
          onChange={ (e, newValue) => setTab(newValue) }
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Posts" />
          <Tab label="Likes" disabled />
          <Tab label="Following" disabled />
          <Tab label="Followers" disabled />
        </Tabs>
      </Paper>
      <Masonry
        css={masonryStyle}
        onImagesLoaded={imagesLoaded}
        onLayoutComplete={handleLayoutComplete}
        enableResizableChildren={true}
        options={{
          itemSelector: '.grid-item',
          percentPosition: true,
          horizontalOrder: true,
        }}
      >
        {gridItems}
      </Masonry>
    </Container>
  );

}

export default Profile;