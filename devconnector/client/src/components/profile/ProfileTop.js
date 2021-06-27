import React, { Fragment } from 'react';
const ProfileTop = ({
  profile: {
    user: { _id, name, avatar },
    company,
    status,
    location,
    website,
    social,
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={`${avatar}`} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location}</p>
      <div className='icons my-1'>
        {website ? (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        ) : null}
        {social ? (
          <Fragment>
            {social.twitter ? (
              <a
                href={social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x'></i>
              </a>
            ) : null}
            {social.facebook ? (
              <a
                href={social.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x'></i>
              </a>
            ) : null}
            {social.linkedin ? (
              <a
                href={social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-linkedin fa-2x'></i>
              </a>
            ) : null}
            {social.youtube ? (
              <a
                href={social.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube fa-2x'></i>
              </a>
            ) : null}
            {social.instagram ? (
              <a
                href={social.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x'></i>
              </a>
            ) : null}
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileTop;
