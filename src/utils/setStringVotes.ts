export const setStringVotes = (votes = 0) => votes < 1000 ? votes : `${Math.round(votes / 1000)}K`
