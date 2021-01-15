import { FunctionComponent, useEffect, useState } from 'react';
import Scores from '../../../api';
import { Score } from '../../../types';

const Dashboard: FunctionComponent = () => {
  const [scoreService] = useState<Scores>(new Scores());
  const [scores, setScores] = useState<Score[]>([]);

  const getScores = async () => {
    // This could be a request to an Score API.
    const result = await scoreService.getScoreList().then((res) => {
      return res.sort((a, b) =>
        a.difficulty > b.difficulty
          ? -1
          : a.difficulty === b.difficulty
          ? a.totalTime > b.totalTime
            ? -1
            : 1
          : 1,
      );
    });
    setScores(result);
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <div className="dashboard">
      <h2>Scores</h2>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Start time</th>
            <th>End time</th>
            <th>Difficulty</th>
            <th>Total Time spent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {scores.length > 0 ? (
            scores.map((s) => {
              return (
                <tr key={s.id}>
                  <td data-label="Name">{s.startTime}</td>
                  <td data-label="Name">{s.endTime}</td>
                  <td data-label="Name">{s.difficulty}</td>
                  <td data-label="Name">{s.totalTime}</td>
                  <td data-label="Name">{s.status}</td>
                </tr>
              );
            })
          ) : (
            <div>No data available</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
