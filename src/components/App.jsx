import React, { Component } from 'react';
import { Container } from 'App.styled';
import { FeedbackOptions } from './FeedbackOption/feedbackOption';
import { Notification } from './Notification/notification';
import { Statistics } from './Statistics/statistics';
import { Section } from './Section/section';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  /*======== START OF FUNCTIONS ===========*/

  updateFeedback = type => {
    this.setState(prevState => {
      return { [type]: prevState[type] + 1 };
    });
  };

  /*======= ADD STATE =========*/

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  /*====== ADD PERCENTAGE ========*/

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  /*======== RENDER ========*/

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <Container>
        <Section title="Please leave your feedback:">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.updateFeedback}
          />
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
  }
}
