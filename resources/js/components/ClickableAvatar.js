import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Avatar} from "@material-ui/core";
import PropTypes from 'prop-types';

const PosterAvatar = styled(Avatar)`
  && {
    width: ${props => props.width + 'px' || '30px'};
    height: ${props => props.height + 'px' || '30px'};
  }
`;

/**
 *
 * @param {string} username - The username of the user you want to link to
 * @param {string} path - The path of the profile picture
 * @param {number} width - The width of the avatar
 * @param {number} height - The height of the avatar
 * @returns React.Component
 * @constructor
 */
function ClickableAvatar(props) {
  const { username, path, width, height, ...rest} = props;

  return (
    <PosterAvatar {...rest} as={Link} to={`/profile/${username}`}>
      <PosterAvatar
        src={
          (path) ? `/storage/${path}`
            : '/images/user_placeholder.png'
        }
      />
    </PosterAvatar>
  )
}

ClickableAvatar.propTypes = {
  /** The username of the user you want to link to */
  username: PropTypes.string,
  /** The path of the profile picture */
  path: PropTypes.string,
  /** The width of the avatar */
  width: PropTypes.number,
  /** The height of the avatar */
  height: PropTypes.number,
};

export default ClickableAvatar;

