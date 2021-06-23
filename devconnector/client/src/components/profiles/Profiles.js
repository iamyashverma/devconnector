import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return !loading ? (
    profiles.length > 0 ? (
      <Fragment>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with
          developers
        </p>
        <div className='profiles'>
          {profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      </Fragment>
    ) : (
      <h4>No Profiles Found </h4>
    )
  ) : (
    <Spinner />
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
