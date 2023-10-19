import React, { useState } from 'react';

import { Container } from 'App.styled';
import { FeedbackOptions } from './FeedbackOption/feedbackOption';
import { Notification } from './Notification/notification';
import { Statistics } from './Statistics/statistics';
import { Section } from './Section/section';

import { BiCoffee } from 'react-icons/bi';

/*  ======== HOOKS ========*/

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /* ======== ADD FEEDBACK ========*/

  const total = good + neutral + bad;

  /*  ======== PERCENT FEEDBACK ========*/

  const positivePercentage = total ? Math.round((good / total) * 100) : '%';

  /*  ======== +1 FEEDBACK  ========*/

  const updateFeedback = type => {
    switch (type) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        console.log('type', type);
    }
  };

  /*  ======== RETURN ========*/

  return (
    <Container>
      <Section title="Please leave your feedback:">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={updateFeedback}
        />

        <BiCoffee size={150} />
      </Section>

      <Section title="Statistics:">
        {total !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback..." />
        )}
      </Section>
    </Container>
  );
};
