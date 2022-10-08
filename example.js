// The output of this program should match the output of the TrueSkill
// calculator at:
//
//   http://atom.research.microsoft.com/trueskill/rankcalculator.aspx
//
// (Select game mode "custom", create 4 players each on their own team,
// check the second "Draw?" box to indicate a tie for second place,
// then click "Recalculate Skill Level Distribution".  The mu and sigma
// values in the "after game" section should match what this program
// prints.

// The objects we pass to AdjustPlayers can be anything with skill and
// rank attributes. 

// Create four players.  Assign each of them the default skill.  The
// player ranking (their "level") is mu-3*sigma, so the default skill
// value corresponds to a level of 0.

alice = {}
alice.skill = [25.0, 25.0/3.0]

bob = {}
bob.skill = [25.0, 25.0/3.0]

chris = {}
chris.skill = [25.0, 25.0/3.0]

darren = {}
darren.skill = [25.0, 25.0/3.0]

function consScore (player) {
    return player.skill[0] - (player.skill[1] * 3);
}

// The four players play a game.  Alice wins, Bob and Chris tie for
// second, Darren comes in last.  The actual numerical values of the
// ranks don't matter, they could be (1, 2, 2, 4) or (1, 2, 2, 3) or
// (23, 45, 45, 67).  All that matters is that a smaller rank beats a
// larger one, and equal ranks indicate draws.


alice.rank = 4
bob.rank = 2
chris.rank = 5
darren.rank = 1

// Do the computation to find each player's new skill estimate.

trueskill = require("./trueskill");
trueskill.AdjustPlayers([alice, bob, chris, darren]);

// Print the results.

console.log("alice: [ rank", alice.rank, ']', alice.skill, consScore(alice));
console.log("bob: [ rank", bob.rank, ']', bob.skill, consScore(bob));
console.log("chris: [ rank", chris.rank, ']', chris.skill, consScore(chris));
console.log("darren: [ rank", darren.rank, ']', darren.skill, consScore(darren));
console.log('-----------------------')


alice.rank = 4
bob.rank = 2
chris.rank = 5
darren.rank = 1

// Do the computation to find each player's new skill estimate.

trueskill = require("./trueskill");
trueskill.AdjustPlayers([alice, bob, chris, darren]);

// Print the results.

console.log("alice: [ rank", alice.rank, ']', alice.skill, consScore(alice));
console.log("bob: [ rank", bob.rank, ']', bob.skill, consScore(bob));
console.log("chris: [ rank", chris.rank, ']', chris.skill, consScore(chris));
console.log("darren: [ rank", darren.rank, ']', darren.skill, consScore(darren));
console.log('-----------------------')


alice.rank = 4
bob.rank = 6
chris.rank = 5
darren.rank = 1

// Do the computation to find each player's new skill estimate.

trueskill = require("./trueskill");
trueskill.AdjustPlayers([alice, bob, chris, darren]);

// Print the results.

console.log("alice: [ rank", alice.rank, ']', alice.skill, consScore(alice));
console.log("bob: [ rank", bob.rank, ']', bob.skill, consScore(bob));
console.log("chris: [ rank", chris.rank, ']', chris.skill, consScore(chris));
console.log("darren: [ rank", darren.rank, ']', darren.skill, consScore(darren));
console.log('-----------------------')


alice.rank = 4
bob.rank = 2
chris.rank = 5
darren.rank = 9

// Do the computation to find each player's new skill estimate.

trueskill = require("./trueskill");
trueskill.AdjustPlayers([alice, bob, chris, darren]);

// Print the results.

console.log("alice: [ rank", alice.rank, ']', alice.skill, consScore(alice));
console.log("bob: [ rank", bob.rank, ']', bob.skill, consScore(bob));
console.log("chris: [ rank", chris.rank, ']', chris.skill, consScore(chris));
console.log("darren: [ rank", darren.rank, ']', darren.skill, consScore(darren));
console.log('-----------------------')




