import React from 'react';
import PropTypes from 'prop-types';

function Copy(props) {
  const { data, guess, rightWrong, submitted } = props;

  return (
    <section className={!submitted && 'blurred'}>
      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        You guessed {guess} days. {rightWrong || 'You are correct'}: employees earning {data.income} lose <span className="variable">{(submitted && data.absence.days) || guess}</span> days per year because of absenteeism and presenteeism, according to research for the Britain’s Healthiest Workplace survey. The research was developed by VitalityHealth and produced in association with the Financial Times, Rand Europe, the research consultancy, the University of Cambridge and Mercer, the human resources consultants.
        {/* eslint-enable max-len */}
      </p>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        The three most serious issues for employees earning {data.income} are:
        {/* eslint-enable max-len */}
      </p>

      <ol className="o-typography-list o-typography-list--ordered">
        <li>{data.mostserious1}</li>
        <li>{data.mostserious2}</li>
        <li>{data.mostserious3}</li>
      </ol>

      <h2 className="o-typography-heading-level-2">Drinking alcohol</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.alcoholpc}</span> per cent of employees earning {data.income} drink more than 14 units of alcohol per week. This compares to 29.4 per cent of employees in the UK. <span className="variable">{data.bingepc}</span> per cent of employees in this income range also go binge drinking at least once per month. This compares to 50.1 per cent of all employees surveyed in the UK. Heavy drinking is often associated with other risk factors, such as <a href="https://www.ft.com/content/38ba3602-3fa7-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">financial worries</a>.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Physical activity</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.physicallyinactivepc}</span> per cent of employees earning {data.income} are physically inactive, meaning that they get less than 150 minutes of physical activity per week; this compares to 35.9 per cent of all employees in the UK. If sedentary employees start to introduce 150 minutes per week of at least moderate exercise, they can reduce productive days lost by 3.2 per year. Some employers are <a href="https://www.ft.com/content/fb5e84ba-3fa2-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">taking action</a> and helping staff to become more active.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Nutrition</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.fruitvegpc}</span> per cent of employees earning {data.income} do not eat at least five portions of fruit and vegetables per day. This compares to 45.5 per cent of all employees in the UK. Britain’s Healthiest Workplace research shows employees with poor diets lose 3.5 productive days per year. Employers are responding <a href="https://www.ft.com/content/f829ff40-3fa2-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">with incentives</a> to eat more salad and less fried food.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Smoking</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.smokepc}</span> per cent of employees earning {data.income} smoke cigarettes, cigars or pipes. This compares to 10.1 per cent of all employees in the UK. While the UK, in common with many other countries around the globe, has laws that prevent smoking in the workplace, China has <a href="https://www.ft.com/content/0817f89c-3fa5-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">yet to introduce</a> a national ban and around half of all Chinese men are regular smokers.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Sleep deprivation</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.sleeppc}</span> per cent of employees earning {data.income} sleep less than seven hours per night. This compares to 29.6 per cent of all employees in the UK. Sleep disorders have been shown to have a dramatic effect on work productivity and are a significant cause of accidents in the workplace. Research shows nearly 30 per cent of British workers sleep less than seven hours per night. Some employers are providing places to <a href="https://www.ft.com/content/09067126-3720-11e7-99bd-13beb0903fa3" target="_blank" rel="noopener noreferrer" className="o-typography-link">take a nap</a> at work.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Obesity</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.obesepc}</span> per cent of employees earning {data.income} are classed as obese, meaning that they have a body mass index of 30 or higher. This compares to 17.9 per cent of all employees in the UK. Some professions, such as nursing, are particularly badly affected — about 25 per cent of UK nurses have a body mass index of more than 30. One idea is gaining traction: should <a href="https://www.ft.com/content/ab4559ee-371f-11e7-99bd-13beb0903fa3" target="_blank" rel="noopener noreferrer" className="o-typography-link">weight be a factor</a> in career appraisals?
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Musculoskeletal conditions</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.twomscondspc}</span> per cent of employees earning {data.income} have two or more musculoskeletal conditions. This compares to 53.1 per cent of all employees in the UK. For many opioid addicts in the US, their plight started with painkillers for conditions such as these. <a href="https://www.ft.com/content/abf2ccf0-371f-11e7-99bd-13beb0903fa3" target="_blank" rel="noopener noreferrer" className="o-typography-link">US employers</a> have to bear their portion of the blame for the opioid addiction epidemic.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Mental health</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.depressionpc}</span> per cent of employees earning {data.income} suffer from depression. This compares to 5.6 per cent of all employees in the UK. Research shows 33 productive days are <a href="https://www.ft.com/content/f585d494-3fa2-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">lost per year</a> by those suffering from moderate to severe depression. Managers <a href="https://www.ft.com/content/358985be-3fa7-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">need to be trained</a> to recognise the symptoms.
        {/* eslint-enable max-len */}
      </p>

      <h2 className="o-typography-heading-level-2">Financial concerns</h2>

      <p className="o-typography-body">
        {/* eslint-disable max-len */}
        <span className="variable">{data.finconcernspc}</span> per cent of employees earning {data.income} have “a lot of” financial concerns. This compares to 7.3 per cent of all employees in the UK. Nearly <a href="https://www.ft.com/content/38ba3602-3fa7-11e7-82b6-896b95f30f58" target="_blank" rel="noopener noreferrer" className="o-typography-link">half of all</a> employees surveyed for Britain’s Healthiest Workplace indicated they have at least some money worries and are losing six productive days per year — some employers are finding ways to help.
        {/* eslint-enable max-len */}
      </p>
    </section>
  );
}

Copy.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  guess: PropTypes.number.isRequired,
  rightWrong: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
};

export default Copy;
