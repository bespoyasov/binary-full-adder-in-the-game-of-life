export function createAgent(x, y) {
  return { x, y };
}

export function neighborsOf({ x, y }) {
  return [
    // Neighbors above:
    createAgent(x - 1, y - 1),
    createAgent(x, y - 1),
    createAgent(x + 1, y - 1),

    // ...On either side:
    createAgent(x - 1, y),
    createAgent(x + 1, y),

    // ...And below given agent:
    createAgent(x - 1, y + 1),
    createAgent(x, y + 1),
    createAgent(x + 1, y + 1),
  ];
}

export function isAlive(agent, population) {
  return !!population[`${agent.x}:${agent.y}`];
}

export function countAliveAround(agent, population) {
  return neighborsOf(agent).reduce((total, agent) => {
    return total + (isAlive(agent, population) ? 1 : 0);
  }, 0);
}
