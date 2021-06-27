import React, { Fragment } from 'react';
import formatDate from '../../utils/formatDate';

export const Experience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <Fragment>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : 'Now'}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </Fragment>
  );
};

export default Experience;
