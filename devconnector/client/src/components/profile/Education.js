import formatDate from '../../utils/formatDate';
import { Fragment } from 'react';
export const Education = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => {
  return (
    <Fragment>
      <h3>{school}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : 'Now'}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </Fragment>
  );
};

export default Education;
