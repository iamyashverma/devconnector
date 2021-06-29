import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ match, post: { post, loading }, getPost }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return (
    <div>
      <Link to='/posts' className='btn'>
        Back to Posts
      </Link>
      {!loading && post && (
        <Fragment>
          <PostItem post={post} />
          <CommentForm id={post._id} />
          <div className='comments'>
            {post.comments.length > 0 &&
              post.comments.map((comment) => (
                <CommentItem postId={post._id} comment={comment} />
              ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
