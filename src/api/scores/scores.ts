import { GAME_SCORES } from '../../constants/constants';
import { Score } from '../../types.d';

class Scores {
  /**
   * Function to mimic an "API request" and obtain a list of scores.
   *
   * @returns Promise
   */
  async getScoreList(): Promise<Score[]> {
    const scores = GAME_SCORES;
    return new Promise((resolve) => {
      setTimeout(() => resolve(scores), 500);
    });
  }
}

export default Scores;
