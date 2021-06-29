import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deletePost, deleteLike, addLike } from '../../actions/post';
import { connect } from 'react-redux';

const PostItem = ({
  post: { _id, text, name, user, avatar, likes, comments, date },
  auth,
  deletePost,
  deleteLike,
  addLike,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY' date={date} />
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => addLike(_id)}
        >
          <i className='fas fa-thumbs-up'></i>
          <span>{likes.length}</span>
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => deleteLike(_id)}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/posts/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, deleteLike, addLike })(
  PostItem
);
