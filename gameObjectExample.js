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

const players = {
     // the below players are now added automatically with each game in the game object.
   /* alice: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []
    },
    bob: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []        
    },
    chris: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []    
    },
    darren: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []    
    },
    franky: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []    
    },
    freddy: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []    
    },
    jacklee: {
        skill: [25.0, 25.0/3.0],
        gamesplayed: []    
    },*/
    makePlayer (name) {
        this[name] = {
            skill: [25.0, 25.0/3.0],
            gamesplayed: []
        }
    }
    
};

const games = {
    game1:{
        gameId: 'game1',
        name: 'Magical Piobaireachd Championship',
        kind: 'piob',
        results: [
            {name: 'alice', pos: 1},
            {name: 'bob', pos: 2},
            {name: 'chris', pos: 3},
            {name: 'darren', pos: 4},
        ] ,
            
        
        judges: ['jacktaylor','jacklee','jackheins']
    },
    game2:{
        gameId: 'game2',
        name: 'Magical MSR Championship',
        kind: 'MSR',
        results: [
            {name: 'franky', pos: 1},
            {name: 'chris', pos: 2},
            {name: 'alice', pos: 3},
            {name: 'bob', pos: 4},
            {name: 'darren', pos: 5},
        ],
        judges: ['jacktaylor','jacklee','jackheins']
    } ,
    game3:{
        gameId: 'game3',
        name: 'Magical HJ Championship',
        kind: 'HJ',
        results: [
            {name: 'alice', pos: 1},
            {name: 'franky', pos: 2},
            {name: 'chris', pos: 3},
            {name: 'bob', pos: 4},
            {name: 'darren', pos: 5},
            
        ] ,
        judges: ['jacktaylor','jacklee','jackheins']
    },
    game4:{
        gameId: 'game4',
        name: 'Game 4',
        kind: 'HJ',
        results: [
            {name: 'jacklee', pos: 1},
            {name: 'franky', pos: 2},
            {name: 'freddy', pos: 3},
            {name: 'bob', pos: 4},
            {name: 'darren', pos: 5},
            
        ] ,
        judges: ['jacktaylor','jacklee','jackheins']
    },
    game5:{
        gameId: 'game5',
        name: 'Game 5',
        kind: 'HJ',
        results: [
            {name: 'jacklee', pos: 1},
            {name: 'franky', pos: 2},
            {name: 'chris', pos: 3},
            {name: 'bob', pos: 4},
            {name: 'darren', pos: 5},
            {name: 'alice', pos: 6},
            {name: 'freddy', pos: 7},
            {name: 'billybob', pos: 7}

        ] ,
        judges: ['jacktaylor','jacklee','jackheins']
    }
};


function consScore (player) {
    return player.skill[0] - (player.skill[1] * 3);
}

function playGame(gameName) {
    
    let adjustArr = []; // initialize an array we can use for the "Adjust Players later. "

   //For each player in the game, log their result (individually)
    gameName.results.forEach(result => {
        let playerName = result.name;
        let playerRank = result.pos;

        //if the player doesn't exist yet, make one, with default '0' true score.
        if (typeof players[playerName] === 'undefined') {
            players.makePlayer(playerName);
        }

        players[playerName].rank = playerRank; // sets rank to player for this game.
        adjustArr.push(players[playerName]);    // push to the Adjustment Array 
        players[playerName].gamesplayed.push(gameName.gameId); //log this game to player object
    });

    //Now, "Adjust" all of the players that participated in this game.
    trueskill = require("./trueskill"); //hooks in the magic trueskill algos
    trueskill.AdjustPlayers(adjustArr); // does the adjustment on the completed array.


    //update the player object with new "consScores" (conservative estimates of skill)
    gameName.results.forEach(result => {
        let playerName = result.name;
        players[playerName].consscore = consScore(players[playerName]); // sets a conScore for the player based on the result of this game.
    });


    //This logs the result of this game on the player ratings to the console
    console.log(gameName.name);
    console.log('------------------------------------');
    gameName.results.forEach(result => {
        let playerName = result.name;
        let playerRank = result.pos; 
        console.log(playerName, ": [ rank", players[playerName].rank, ']', players[playerName].skill, consScore(players[playerName]), '---> Total games = ', players[playerName].gamesplayed.length);
    })
    console.log('------------------------------------');
    console.log(' ');

} ;

//Now play all the games in the game object.
for (const game in games) {
    if (game.includes('game')) {
       playGame(games[game]);
    }
}

console.log(players);


