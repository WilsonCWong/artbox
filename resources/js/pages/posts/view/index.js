import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import { CircularProgress, Paper, Avatar, Button } from '@material-ui/core';
import { useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { relativeFromDate } from "@/utils/time-helpers";
import ClickableAvatar from "@/components/ClickableAvatar";
import { useFlash } from "@/hooks/useFlash";
import AlertsSnack from "@/components/Error/AlertsSnack";
import { useAuthorization } from "@/hooks/useAuthorization";
import { IconButton } from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
`;

const ResponsivePaper = styled(Paper)`
  max-width: 1000px;
  max-height: 600px;
  min-height: 425px;
  margin-left: 25px;
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #efefef;
`;

const LeftPanel = styled.div`
  display: block;
  width: ${props => (props.width) ? props.width + 'px' : '60%'};
  height: 600px;
  user-select: none;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  height: ${props => (props.height) ? props.height + 'px' : 'auto'};
  width: auto; 
  max-width: 100%;
  max-height: 100%;

`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  width: 400px;
  height: 600px;
  border-left: 1px solid #efefef;
`;

const UserInfo = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #efefef;
`;

const CommenterInfo = styled(UserInfo)`
  align-items: flex-start;
  border-bottom: none;
  padding-right: 10px;
`;

const PosterAvatar = styled(Avatar)`
  && {
    width: 40px;
    height: 40px;
  }
`;

const PosterName = styled.a`
  font-size: 1em;
  font-family: 'Nunito', sans-serif;
  margin-left: 10px;
  margin-bottom: 0;
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: color 0.2s ease-in-out;
  display: inline;
  
  &:hover {
    text-decoration: none;
    color: #6c6c6c;
  }
`;

const DescriptionBox = styled.div`
  padding: 15px;
`;

const PostTitle = styled.h1`
  font-size: 1.25em;
`;

const PostDescription = styled.p`
  font-size: 0.85em;
  margin-bottom: 10px;
`;

const LightText = styled.p`
  font-size: 0.75em;
  color: #a6a6a6;
  margin-bottom: 0;
`;

const CommentBox = styled.div`
  border-top: 1px solid #efefef;
  margin-top: auto;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
 
  -ms-overflow-style: none;
  scrollbar-width: none; 
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Comment  = styled.p`
  font-size: 1em;
  font-family: "Segoe UI", "Segoe UI Emoji", sans-serif;
  margin: 0 0 0 10px;
  display: inline;
`;

const CommentInputForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 5px;
  align-items: center;
  border-top: 1px solid #efefef;
  max-height: 75px;
  min-height: 75px;
`;

const CommentInput = styled.textarea`
  width: 75%;
  height: 65px;
  resize: none;
  padding: 5px;
  border: none;
  outline: none;

  ::placeholder {
    line-height: 55px;
  }
  
  &:focus::placeholder {
    color: transparent;
  }

`;

const EditCommentInput = styled.textarea`
  width: 100%;
  resize: none;
  padding: 5px;
  outline: none;
`;

const EditCommentButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledIconButton = styled(IconButton)`
  display: inline;
`;

const Center = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PostButtonContainer = styled(Center)`
  width: 25%;
  height: 65px;
`;

const CommentSubmit = styled.button`
  &&& {
    border: 0;
    background: none;
    color: #3897f0;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: bold;
  }
  
  &&&:focus {
    outline: none;
  }
  
  &&&:disabled {
    color: #bfbfbf;
  }
  
  &&&:enabled:hover {
    color: #3a72ce;
  }
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid #999;
  height: 0;
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: middle;
  flex-grow: 1;
  display: inline-block;
`;


function ViewPost() {
  const { hexID } = useParams();
  const history = useHistory();
  const user = useSelector(state => state.user.user);

  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState(null);
  const [loadingDimensions, setLoadingDimensions] = useState(true);
  const [width, setWidth] = useState(-1);
  const [height, setHeight] = useState(null);
  const [comment, setComment] = useState('');
  const [mount, setMount] = useState(0);
  const [editCommentID, setEditCommentID] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const { messages, messageType, setMessages } = useFlash();
  const [isAuthorized, authorized] = useAuthorization('posts', parseInt(hexID, 16));

  const commentsContainer = useRef();
  const commentsSubmitButton = useRef();

  useEffect(() => {
    axios.get(`/web_api/posts/${parseInt(hexID, 16)}`, {
      headers: { 'Accept': 'application/json' }
    }).then(res => {
        setPost(res.data.post);
        setLoadingPost(false);
        let c = commentsContainer.current;
        c.scrollTop = c.scrollHeight;
    }).catch(err => {
      setLoadingPost(false);
      (err.response.status === 500) ?
        setMessages({server: 'A server error has occurred.'})
        : setMessages(err.response.data.errors);
    });
  }, [hexID, mount]);

  const loadImageHandler = e => {
    let img = e.target;

    // Calculate ratio the width needs to be increased by to return to source aspect
    let aspect = img.width / img.height;
    if (aspect <= 1) {
      if (img.width < 400) {
        let ratio = 400 / img.width;
        setWidth(400);
        setHeight(img.height * ratio);
      }
      else {
        setWidth(img.width);
      }
      return;
    }

    let containerAspect = img.width / 600;
    let ratio =  aspect / containerAspect;
    // Apply the ratio
    let newWidth = img.width * ratio;

    setWidth(newWidth);
    setLoadingDimensions(false);
  };

  const submitComment = e => {
    e.preventDefault();

    let c = comment;
    setComment('');
    axios.post(`/web_api/posts/${parseInt(hexID, 16)}/comments`, { comment: c }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      setComment('');
      setMount(mount + 1);
    }).catch(err => {
      (err.response.status === 500) ?
        setMessages({server: 'A server error has occurred.'})
        : setMessages(err.response.data.errors);
    })
  };

  const deleteComment = id => {
    axios.post(`/web_api/comments/${id}`, { '_method': 'DELETE'}, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).then(res => {
      setMount(mount + 1);
      setMessages({m: 'Comment deleted.'}, 'success');
    }).catch(err => {
      (err.response.status === 500) ?
        setMessages({server: 'A server error has occurred.'})
        : setMessages(err.response.data.errors);
    });
  };

  const updateComment = (e, id) => {
    e.preventDefault();

    axios.post(`/web_api/comments/${id}`, { '_method': 'PATCH', comment: editCommentText}, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).then(res => {
      setMount(mount + 1);
      setEditCommentID(null);
      setEditCommentText('');
      setMessages({m: 'Comment updated.'}, 'success');
    }).catch(err => {
      (err.response.status === 500) ?
        setMessages({server: 'A server error has occurred.'})
        : setMessages(err.response.data.errors);
    });
  }

  const handleTextArea = e => {
    if (e.target.value === '') {
      commentsSubmitButton.current.disabled = true;
    } else {
      commentsSubmitButton.current.disabled = false;
    }
    setComment(e.target.value);
  };

  const renderComments = () => {
    if (post.comments.length === 0) {
      return (
        <Center>
          <LightText>There are no comments to view.</LightText>
        </Center>
      );
    }

    const handleEdit = (id, comment) => {
      setEditCommentID(id);
      setEditCommentText(comment);
    };

    const renderCommentToolbar = (id, comment) => {
      return (
        <>
          <StyledIconButton onClick={e => handleEdit(id, comment)} size='small'>
            <EditIcon fontSize='small' />
          </StyledIconButton>
          <StyledIconButton onClick={e => deleteComment(id)} size='small'>
            <DeleteIcon fontSize='small' />
          </StyledIconButton>
        </>
      )
    };

    return (<>
      { post?.comments?.map(c => {
        return (
          <div key={c?.id}>
            <CommenterInfo>
              <ClickableAvatar
                username={c?.commenter.username}
                path={c?.commenter.profile_picture}
              />
              { (editCommentID === c?.id) ?
                <form onSubmit={(e) => updateComment(e, c?.id)} css='width: 100%; margin-left: 10px;'>
                  <EditCommentInput
                    required
                    value={editCommentText}
                    onChange={e => setEditCommentText(e.target.value)}
                  />
                  <EditCommentButtonContainer>
                    <Button onClick={e => setEditCommentID(null)}>Cancel</Button>
                    <Button type='submit'>Save</Button>
                  </EditCommentButtonContainer>
                </form>
                :
                <div css='width: 100%; margin-left: 10px;'>
                  <PosterName css='margin-left: 0;' as={Link} to={`/profile/${c?.commenter.username}`}>
                    {c?.commenter.username}
                  </PosterName>
                  <Comment>{c?.comment}</Comment>
                  <div css='display: flex; align-items: center;'>
                    <div>
                      <LightText css='display: inline; margin-right: 10px;'>
                        {relativeFromDate(c?.created_at)}
                      </LightText>
                      {(user?.id === c?.commenter.id) && renderCommentToolbar(c?.id, c?.comment)}
                    </div>
                    {(c?.created_at !== c?.updated_at) && (<>
                      <HorizontalLine/>
                      <LightText css='display: inline; margin-left: auto; margin-right: 10px;'>
                        Edited: {relativeFromDate(c?.updated_at)}
                      </LightText>
                    </>)}
                  </div>
                </div>
              }
            </CommenterInfo>
          </div>
        );
      })}
    </>);
  };

  if (loadingPost) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <AlertsSnack messages={messages} variant={messageType} />
      <ResponsivePaper>
          <LeftPanel width={width}>
            <ImageContainer>
                <Image height={height} onLoad={loadImageHandler} src={`/storage${post.media[0].content_url}`} />
            </ImageContainer>
          </LeftPanel>
        <RightPanel>
          <UserInfo>
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
            { authorized &&
              <IconButton onClick={e => history.push(`/posts/${hexID}/edit`)} className='ml-auto'>
                <EditIcon />
              </IconButton>
            }
          </UserInfo>
          <DescriptionBox>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.description ? post.description : ''}</PostDescription>
            <LightText>Posted {relativeFromDate(post.created_at)}</LightText>
          </DescriptionBox>
          <CommentBox ref={commentsContainer}>
            {renderComments()}
          </CommentBox>
          <CommentInputForm onSubmit={submitComment}>
            <CommentInput
              placeholder="Add a comment..."
              required
              value={comment}
              onChange={handleTextArea}
            />
            <PostButtonContainer>
              <CommentSubmit disabled ref={commentsSubmitButton}>
                Post
              </CommentSubmit>
            </PostButtonContainer>
          </CommentInputForm>
        </RightPanel>
      </ResponsivePaper>
    </Container>
  )
}

export default ViewPost;