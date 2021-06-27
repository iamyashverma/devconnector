import PropTypes from 'prop-types';

export const About = ({
  profile: {
    user: { _id, name },
    bio,
    skills,
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
      <p>{bio ? bio : null}</p>
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.length > 0
          ? skills.map((skill, index) => (
              <div key={index} className='p-1'>
                <i className='fa fa-check'></i> {skill}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

About.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default About;
