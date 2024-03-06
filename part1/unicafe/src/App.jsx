import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedBack = good + bad + neutral;
  const average = (good - bad) / totalFeedBack || 0;
  const positive = (good / totalFeedBack) * 100 || 0;
  return (
    <>
    <h2>statistics</h2>
    <table>
      <tbody>
      <tr>
        <td>Good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>Neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>Bad</td>
        <td>{bad}</td>
      </tr>
      {good || neutral || bad ? (
      <>
        <StatisticLine text={"all"} value={totalFeedBack}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positive} unit="%"/>
      </>
      ) : (
        <tr>
          <td>No feedback given</td>
        </tr>
      )}
        </tbody>
      </table>
      </>
    )
};

const StatisticLine = ({text, value, unit}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}{unit}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
