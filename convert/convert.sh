#!/bin/bash
set -x verbose #echo on
coffee PyToCoffee
cp trueskill.almost.coffee trueskill.coffee
patch trueskill.coffee < trueskill.patch
python test.py "[{\"skill\":[25.0, 8.33333333333],\"rank\":1},{\"skill\":[25.0, 8.33333333333],\"rank\":2},{\"skill\":[25.0, 8.33333333333],\"rank\":2},{\"skill\":[25.0, 8.33333333333],\"rank\":4}]"