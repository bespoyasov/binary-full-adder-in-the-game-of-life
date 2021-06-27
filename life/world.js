import { countAliveAround, neighborsOf, createAgent } from "./agent.js";
import { populateRandom } from "./population/random.js";

export class World {
  constructor(rows, columns, population = populateRandom(rows, columns)) {
    this.rows = rows;
    this.columns = columns;
    this.population = population;
  }

  get agents() {
    return Object.values(this.population);
  }

  isVisible = ({ x, y }) => {
    const offset = 5;
    return (
      x >= -offset &&
      y >= -offset &&
      x < this.columns + offset &&
      y < this.rows + offset
    );
  };

  evolve = ({ iterations = 1 } = {}) => {
    const evolved = {};
    const checked = {};

    this.agents.forEach((agent) => {
      if (!this.isVisible(agent)) return;

      const alive = countAliveAround(agent, this.population);

      if (alive === 2 || alive === 3) {
        const { x, y } = agent;
        evolved[`${x}:${y}`] = agent;
      }

      neighborsOf(agent).forEach((neighbor) => {
        const { x, y } = neighbor;

        // Skip already checked cells.
        if (checked[`${x}:${y}`]) return;
        checked[`${x}:${y}`] = true;

        if (countAliveAround(neighbor, this.population) !== 3) return;
        evolved[`${x}:${y}`] = createAgent(x, y);
      });
    });

    this.population = evolved;

    /**
     * To fasten the evolution we can recalculate
     * the state more than once at a time:
     */
    if (--iterations > 0) {
      this.evolve({ iterations });
    }
  };
}
