
// Sports that require team division
const TEAM_SPORTS = [
  'Basketball',
  'Soccer', 
  'Football',
  'Volleyball',
  'Baseball'
];

// Sports that are individual or don't need team division
const INDIVIDUAL_SPORTS = [
  'Tennis',
  'Swimming',
  'Running'
];

export const isTeamSport = (sport: string): boolean => {
  return TEAM_SPORTS.includes(sport);
};

export const divideIntoTeams = (participants: any[]) => {
  if (participants.length < 2) {
    return { teamA: participants, teamB: [] };
  }

  // Shuffle participants randomly
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  
  // Divide into two teams as evenly as possible
  const midpoint = Math.ceil(shuffled.length / 2);
  const teamA = shuffled.slice(0, midpoint);
  const teamB = shuffled.slice(midpoint);

  return { teamA, teamB };
};
