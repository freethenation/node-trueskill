childProcess = require 'child_process'

rnd=(min, max)->Math.floor(Math.random() * (max - min + 1)) + min;

createPlayers=()->
    numPlayers = rnd(2,10)
    defaultSkill = rnd(1,100)
    players = []
    for i in [0...numPlayers] by 1
        players.push({skill:[defaultSkill,defaultSkill/3.0], id:i})
    return players

setRanks=(players)->
    for p in players
        p.rank = rnd(1,players.length)

checkEqual=(players1, players2)->
    if players1.length != players2.length then throw new Error "player arrrays not same length"
    for i in [0...players1.length]
        if Math.abs(players1[i].skill[0] - players2[i].skill[0]) > .001 then throw "python and coffescript dont agree"
        if Math.abs(players1[i].skill[1] - players2[i].skill[1]) > .001 then throw "python and coffescript dont agree"

numTests = 20
numIters = 0
players = null
runTest=()->
    if numTests <= 0 then return # done!
    if numIters <= 0
        numTests--
        players=createPlayers()
        numIters=20
    numIters--
    setRanks(players)
    playersJs = JSON.parse(JSON.stringify(players))
    require("./trueskill").AdjustPlayers(playersJs)
    childProcess.exec("python test.py \"#{JSON.stringify(players).replace(/"/mg,"\\\"")}\"", 
        (error, stdout, stderr)->
            if error
                console.log(error.stack)
                console.log('Error code: '+error.code)
                console.log('Signal received: '+error.signal)
            playersPy = JSON.parse(stdout)
            console.log "orig"
            console.log players
            console.log "js"
            console.log playersJs
            console.log "py"
            console.log playersPy
            checkEqual(playersJs,playersPy)
            runTest()
            players = playersJs
    )
runTest()