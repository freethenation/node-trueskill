gaussian = require "free-gaussian"
portedTrueskill = require "./portedTrueskill"

module.exports = portedTrueskill

playerSkillToGuassian = (player)->gaussian(player[0], player[1])

module.exports.ChanceOfWinning = (player1, player2)->
  """The chance that trueskill assigns to player1 winning vs player2"""
  player1 = playerSkillToGuassian(player1)
  player2 = playerSkillToGuassian(player2)
  return 1.0-player1.sub(player2).cdf(0.0)