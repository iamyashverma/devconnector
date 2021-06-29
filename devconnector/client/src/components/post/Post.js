import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ match }) => {
  return <div>{match.params.id}</div>;
};

Post.propTypes = {};

export default Post;
