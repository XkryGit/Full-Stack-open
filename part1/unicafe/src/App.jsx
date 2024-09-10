import { useState } from "react";

const StatisticLine = ({ Statistic, StatisticText }) => {
  return (
    <tr>
      <td>{StatisticText}</td>
      <td>{Statistic}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad)) * 100;
  return (
    <>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine Statistic={good} StatisticText="Good" />
            <StatisticLine Statistic={neutral} StatisticText="Neutral" />
            <StatisticLine Statistic={bad} StatisticText="Bad" />
            <StatisticLine Statistic={total} StatisticText="Total" />
            <StatisticLine Statistic={average} StatisticText="Average" />
            <StatisticLine Statistic={positive} StatisticText="Positive" />
          </tbody>
        </table>
      )}
    </>
  );
};

const Button = ({ setParameter, parameter, parameterText }) => {
  return (
    <>
      <button onClick={() => setParameter(parameter + 1)}>
        {parameterText}
      </button>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button setParameter={setGood} parameter={good} parameterText="Good" />
      <Button
        setParameter={setNeutral}
        parameter={neutral}
        parameterText="Neutral"
      />
      <Button setParameter={setBad} parameter={bad} parameterText="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
