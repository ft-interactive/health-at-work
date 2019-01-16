import React from 'react';
import PropTypes from 'prop-types';

function Copy(props) {
  const { data, submitted, averages } = props;
  const selectedDimension = data.age;
  let className = 'copy';
  if (!submitted) className += ' blurred';

  return (
    <section className={className}>
      <h2 className="o-typography-heading-level-2">Poor nutrition</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.fruitvegpc}</span> per cent of employees aged {selectedDimension} do not eat at least five portions of fruit and vegetables per day. This compares to an average of {averages.fruitvegpc} per cent of all employees surveyed. Britain’s Healthiest Workplace research shows the UK’s youngest employees have the worst diets, something that “<a href="https://www.ft.com/content/529a4548-db7e-11e8-9f04-38d397e6661c" target="_blank" rel="noopener noreferrer" className="o-typography-link">onboarding</a>” executives may want to consider when thinking about how to help young employees settle in.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Musculoskeletal ailments</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.twomscondspc}</span> per cent of employees aged {selectedDimension} have two or more musculoskeletal conditions. This compares to an average of {averages.twomscondspc} per cent of all employees surveyed. An estimated <a href="https://www.ft.com/content/04c74a88-9cc1-11e8-88de-49c908b1f264" target="_blank" rel="noopener noreferrer" className="o-typography-link">17.8m</a> people in the UK live with some form of arthritis — nearly a third of the total population.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Binge or excessive drinking</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.alcoholpc}</span> per cent of employees aged {selectedDimension} drink more than 14 units of alcohol per week. This compares to an average of {averages.alcoholpc} per cent of all employees surveyed. <span className="variable">{data.bingepc}</span> per cent of employees in this age range also go binge drinking at least once per month. Binge drinking is more common in younger workers. Heavy drinking is often associated with other problems and, if noticed by employers, should be a trigger to provide <a href="https://www.ft.com/content/529a4548-db7e-11e8-9f04-38d397e6661c" target="_blank" rel="noopener noreferrer" className="o-typography-link">help</a>.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Inadequate sleep</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.sleeppc}</span> per cent of employees aged {selectedDimension} sleep less than seven hours per day. This compares to an average of {averages.sleeppc} per cent of all employees surveyed. Lack of sleep has been associated with ill health, low productivity and irregular working hours, notably for those on <a href="https://www.ft.com/content/d8d82ebe-9cbc-11e8-88de-49c908b1f264" target="_blank" rel="noopener noreferrer" className="o-typography-link">zero-hour</a> contracts.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Inactivity</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.physicallyinactivepc}</span> per cent of employees aged {selectedDimension} are physically inactive, meaning they exercise for less than 150 minutes per week. This compares to an average of {averages.physicallyinactivepc} per cent of all employees surveyed. Staff who are involved in physical activity challenges, such as competing with colleagues in a race, have reported <a href="https://www.ft.com/content/f0f209b2-c7f4-11e8-86e6-19f5b7134d1c" target="_blank" rel="noopener noreferrer" className="o-typography-link">significant improvements</a> to their overall health and happiness.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">High stress</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.twoplusstressdimensions}</span> per cent of employees aged {selectedDimension} report two or more aspects of workplace stress, defined as: lack of choice over the tasks they carry out at work; not receiving respect from colleagues; strained relationships at work; and lack of clarity on duties and responsibilities. This compares to an average of {averages.twoplusstressdimensions} per cent of all employees surveyed. Workplace stress is often associated with other risk factors such as <a href="https://www.ft.com/content/d2fcf18c-9cbc-11e8-88de-49c908b1f264" target="_blank" rel="noopener noreferrer" className="o-typography-link">mental health issues</a>.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Obesity</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.obesepc}</span> per cent of employees aged {selectedDimension} are classed as obese, meaning that they have a body mass index of 30 or higher. This compares to an average of {averages.obesepc} per cent of all employees surveyed. Malaysia has become the <a href="https://www.ft.com/content/e8f25cb4-9cbe-11e8-88de-49c908b1f264" target="_blank" rel="noopener noreferrer" className="o-typography-link">fattest country</a> in Asia, sparking a debate over who is to blame and what employers and policymakers can do about it.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Smoking</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.smokepc}</span> per cent of employees aged {selectedDimension} smoke cigarettes, cigars or pipes. This compares to an average of {averages.smokepc} per cent of all employees surveyed. Workplace interventions can have a powerful effect on smokers, with at least one company reporting a <a href="https://www.ft.com/content/3ede482e-c652-11e8-86e6-19f5b7134d1c" target="_blank" rel="noopener noreferrer" className="o-typography-link">steep drop</a> in the number of staff who smoke after provision of cessation classes.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Financial concerns</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.finconcernspc}</span> per cent of employees aged {selectedDimension} have “a lot of” financial concerns. This compares to an average of {averages.finconcernspc} per cent of all employees surveyed. <a href="https://www.ft.com/content/0777dece-9cbb-11e8-88de-49c908b1f264" target="_blank" rel="noopener noreferrer" className="o-typography-link">Money worries</a> accounted for an average loss of 7.9 productive days per employee in the UK last year, according to Britain’s Healthiest Workplace research.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Depression</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.depressionpc}</span> per cent of employees aged {selectedDimension} suffer from depression. This compares to an average of {averages.depressionpc}  per cent of all employees surveyed. Britain’s Healthiest Workplace research shows that younger employees are more likely to suffer from mental health issues. Although many companies now have good policies in place, <a href="https://www.ft.com/content/d2fcf18c-9cbc-11e8-88de-49c908b1f264" target="_blank" rel="noopener noreferrer" className="o-typography-link">more training</a> is needed for line managers.
        {/* eslint-enable max-len */}
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
