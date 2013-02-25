fs = require 'fs'
path = require 'path'
file = fs.readFileSync(path.resolve(__dirname, "trueskill.py"), "utf8")
lines = file.match(/[^\n\r]*[\n\r]+/gm)
replace=(regex, func)->
    lines = (line.replace(regex, func) for line in lines)

#remove line breaks
replace(/\n|\r/gm, "")
#Replace doc strings with comments
replace(/"""/mg, "###")
#Warn about pow aka **
#each(/\/*\/*/g, )
#match class methods
replace(/def\s+(\w+)\s*\(\s*self\s*,?\s*([^)]*)\):/g, "$1:($2)->")
#match non class methods
replace(/def\s+(\w+)\s*\(([^)]*)\):/g, "$1=($2)->")
#match class defs that extend object
replace(/class\s*(\w+)\s*\(\s*object\s*\):/g, "class $1")
#match class defs that extend some other class
replace(/class\s*(\w+)\s*\(\s*(\w+)\s*\):/g, "class $1 extends $2")
#rename some commone methods
replace(/__init__:\(/g,"constructor:(")
replace(/__str__:\(/g,"toString:(")
replace(/__(\w+)__:\(/mg,"$1:(")
#replace self. calls
replace(/self\.(\w)/mg,"@$1")
#remove : at end of common statements
replace(/elif(\s[^:]+):\s*$/g,"else if$1")
replace(/if(\s[^:]+):\s*$/g,"if$1")
replace(/else\w*:\s*$/g,"else")
replace(/for(\s[^:]+):\s*$/g,"for$1")
#replace None with null
replace(/\b(?=\w)None\b(?!\w)/g,"null")

#Make call to constructors correct
replace(/LikelihoodFactor\(/g,"new LikelihoodFactor(")
replace(/PriorFactor\(/g,"new PriorFactor(")
replace(/SumFactor\(/g,"new SumFactor(")
replace(/TruncateFactor\(/g,"new TruncateFactor(")
replace(/Variable\(/g,"new Variable(")
replace(/Gaussian\(/g,"new Gaussian(")
#Replace slice calls
replace(/\[:-1\]/g,".slice(0,-1)")
replace(/\[1:\]/g,".slice(1)")
replace(/\[:\]/g,".slice(0)")
#replace super calls
replace(/super\(\s*\w+\s*,\s*self\s*\)\.__init__\(([^)]*)\)/g,"super($1)")
#replace self with this
replace(/\(self/g,"(this")

fs.writeFileSync(path.resolve(__dirname, "trueskill.almost.coffee"), lines.join("\n"), "utf8")
