const activePlayers = new Set();

function addPlayer(username) {
  if (activePlayers.has(username)) return false;
  activePlayers.add(username);
  return true;
}

function removePlayer(username) {
  activePlayers.delete(username);
}

function getPlayers() {
  return Array.from(activePlayers);
}

module.exports = { addPlayer, removePlayer, getPlayers };
