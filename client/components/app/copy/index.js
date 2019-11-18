import React from 'react';
import PropTypes from 'prop-types';

function Copy(props) {
  const { data, submitted, averages } = props;
  const selectedDimension = data.age;
  let className = 'copy';
  if (!submitted) className += ' blurred';

  return (
    <section className={className}>
      <h2 className="o-typography-heading-level-2">Musculoskeletal conditions</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <strong>Muscle and joint problems</strong> affect a very high proportion of workers. As many as <span className="variable">{data.twomscondspc}</span> per cent of employees in the {selectedDimension} age group complain of having at least two musculoskeletal conditions, compared with an average of 53.8 per cent for the total sample. Acute back pain and arthritis can contribute towards absence from work, particularly in jobs that require more physical activity.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Obesity, inactivity and poor nutrition</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.fruitvegpc}</span> per cent of employees in the {selectedDimension} age group fail to eat at least <strong>five portions of fruit and vegetables</strong> per day, compared with an average of 64.9 per cent for all employees. Poor diets can contribute to tiredness, stress and ineffectiveness at work.
        {/* eslint-enable max-len */}
      </p>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        The share of employees aged {selectedDimension} considered <strong>physically inactive</strong>, because they spend less than 2.5 hours exercising each week, is <span className="variable">{data.physicallyinactivepc}</span> per cent. This compares with an average of 33.3 per cent for all employees. Exercise can have a positive impact on concentration at work and can prevent longer-term problems such as heart disease.
        {/* eslint-enable max-len */}
      </p>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        This year, <span className="variable">{data.obesepc}</span> per cent of employees aged {selectedDimension} have been classed as <strong>obese</strong>, meaning they have a body mass index of 30 or above. This compares with an average of 19.6 per cent for all employees — a figure that has been steadily rising over the past five years.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Smoking and drinking to excess</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.alcoholpc}</span> per cent of employees aged {selectedDimension} <strong>drink more than 14 units</strong> of alcohol per week, compared with 27.9 per cent of all employees. <span className="variable">{data.bingepc}</span> per cent in this age range also <strong>binge-drink</strong> at least once a month. Raised blood alcohol levels have been found to increase the likelihood of poor judgments and mistakes at work, as well as reducing productivity.
        {/* eslint-enable max-len */}
      </p>
      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.smokepc}</span> per cent of employees in the {selectedDimension} age group <strong>smoke</strong> cigarettes, cigars or pipes, compared with 10.2 per cent of all employees. This figure has been falling steadily over the past five years. 
        {/* eslint-enable max-len */}
      </p>


      <h2 className="o-typography-heading-level-2">High stress, inadequate sleep and depression</h2>
      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.twoplusstressdimensions}</span> per cent of employees aged {selectedDimension} say they have been affected by two or more types of work-related <strong>stress</strong>, such as a lack of choice over type of work, not receiving respect from colleagues, experiencing strained relationships with colleagues or lacking clarity on their duties and responsibilities. On average, 26.4 per cent of those surveyed say they have experienced at least two of these types of stress.
        {/* eslint-enable max-len */}
      </p>
      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.sleeppc}</span> per cent in the {selectedDimension} age group say they <strong>sleep</strong> fewer than seven hours a night, compared with 35.1 per cent of all employees. An even higher percentage claim to have difficulties sleeping, while more than 60 per cent say they feel tired at work at least once a week.
        {/* eslint-enable max-len */}
      </p>
      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.depressionpc}</span> per cent of employees aged {selectedDimension} suffer from <strong>depression</strong>, compared with an average of 8.5 per cent of the total.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Financial woes</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.finconcernspc}</span> per cent of employees aged {selectedDimension} claim to have “a lot” of <strong>financial concerns</strong>, compared with 10 per cent for the whole sample. Financial insecurity can be a considerable distraction, negatively affecting productivity and the ability to come up with new ideas. It can also be a trigger for stress and absence from work.        {/* eslint-enable max-len */}
      </p>


    </section>
  );
}

Copy.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  submitted: PropTypes.bool.isRequired,
  averages: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Copy;
