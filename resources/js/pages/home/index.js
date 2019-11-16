import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Avatar, Grid, Paper } from '@material-ui/core';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Masonry from 'react-masonry-component';


const masonryStyle = css`
  max-width: 100vw;
  background-color: #fbfbfb;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Container = styled(Grid)`
  min-height: calc(100vh - 64px);
  background-color: #fbfbfb;
  justify-content: flex-start;
  flex-direction: column;
`;

const GridImage = styled.img`
  display: block;
  width: 100%;
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



function Home() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get('/web_api/feed/home/50', {
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => {
      setPosts(res.data.posts);
      setLoadingPosts(false);
    }).catch(err => {
      console.log(err);
      setLoadingPosts(false);
    });
  }, []);

  const gridItems = e => {
    return (
      <>
        {posts.map(p => {
          return (
            <div key={p.id} className="grid-item">
              <GridItem>
                <Link to={`/posts/${p.id.toString(16)}`}>
                  <GridImage src={`/storage${p.media[0].content_url}`} />
                </Link>
                <ImageOverlay>
                  <div css='display: flex; flex-direction: column; justify-content: flex-start; min-width: 0;'>
                    <PostTitle as={Link} to={`/posts/${p.id.toString(16)}`}>
                      {p.title}
                    </PostTitle>
                    <PosterInfo>
                      <PosterAvatar as={Link} to={`/profile/${p.poster.username}`}>
                        <PosterAvatar
                          src={
                            (p.poster.profile_picture) ? `/storage/${p.poster.profile_picture}`
                              : '/images/user_placeholder.png'
                          }
                        />
                      </PosterAvatar>
                      <PosterName as={Link} to={`/profile/${p.poster.username}`}>
                        {p.poster.username}
                      </PosterName>
                    </PosterInfo>
                  </div>
                </ImageOverlay>
              </GridItem>
            </div>
          );
        })}
      </>
    )
  };

  return (
    <Container container>
      <Grid item xs={12}>
        <Carousel css='height: 450px;'>
          <Carousel.Item css='max-height: 450px;'>
            <img
              css='filter: brightness(50%);'
              className="d-block w-100"
              src="/images/slide1.jpg"
              alt="Built by Artists, for Artists."
            />
            <Carousel.Caption>
              <h3>Built by Artists, for Artists</h3>
              <p>Starting uploading your portfolio and let it shine.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item css='height: 450px;'>
            <img
              className="d-block w-100"
              src="/images/slide2.jpg"
              alt="Recruit Top Tier Talent"
            />
            <Carousel.Caption>
              <h3>Recruit Top Tier Talent</h3>
              <p>
                With a massive pool of artistic talent, you'll find no shortage of
                illustrators, designers, and 3d modeling experts to meet with for your
                next project.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item css='height: 450px;'>
            <img
              className="d-block w-100"
              src="/images/slide3.jpg"
              alt="Industry-Standard Training"
            />
            <Carousel.Caption>
              <h3>Industry-Standard Training</h3>
              <p>
                ArtBox frequently invites proven and skilled artists that work in the industry to host training sessions
                for all members of ArtBox. Don't miss out!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>
        <Masonry
          css={masonryStyle}
          enableResizableChildren={true}
          options={{
            itemSelector: '.grid-item',
            percentPosition: true,
            horizontalOrder: true,
          }}
        >
          {(!loadingPosts) ? gridItems() : null}
        </Masonry>
      </Grid>
    </Container>
  )
}

export default Home;