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
  height: calc(100vh - 64px);
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
  font-family: "Nunito", "Roboto", "Helvetica", "Arial", sans-serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,.37);
  color: #2d2d2d;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  color: #FFF;
  background-color: rgba(0, 0, 0, 0.35);
  transition: opacity 0.2s ease-in-out;
`;

const GridItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  &:hover ${ImageOverlay} {
    pointer-events: initial;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.35);
  }
`;

const GridImage = styled.img`
  display: block;
  width: 100%;
`;

const PostTitle = styled.h2`
  font-size: 1.5em;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
  font-family: 'Nunito', sans-serif;
  color: #FFF;
  max-width: 100%;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    text-decoration: none;
    color: #bfbfbf;
  }
`

const PosterInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
`;

const PosterAvatar = styled(Avatar)`
  && {
    width: 30px;
    height: 30px;
  }
`;

const PosterName = styled.a`
  font-size: 1em;
  font-family: 'Nunito', sans-serif;
  margin-left: 10px;
  margin-bottom: 0;
  text-decoration: none;
  color: #FFF;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    text-decoration: none;
    color: #bfbfbf;
  }
`;

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
  }, [username])

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
          <GridItem>
            <Link to={`/posts/${post.id.toString(16)}`}>
              <GridImage src={`/storage${post.media[0].content_url}`} />
            </Link>
            <ImageOverlay>
              <div css='display: flex; flex-direction: column; justify-content: flex-start; min-width: 0;'>
                <PostTitle as={Link} to={`/posts/${post.id.toString(16)}`}>
                  {post.title}
                </PostTitle>
                <PosterInfo>
                  <PosterAvatar as={Link} to={`/profile/${post.poster.username}`}>
                    <PosterAvatar
                      src={
                        (post.poster.profile_picture) ? `/storage/${post.poster.profile_picture}`
                          : '/images/user_placeholder.png'
                      }
                    />
                  </PosterAvatar>
                  <PosterName as={Link} to={`/profile/${post.poster.username}`}>
                    {post.poster.username}
                  </PosterName>
                </PosterInfo>
              </div>
            </ImageOverlay>
          </GridItem>
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