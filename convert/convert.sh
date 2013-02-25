#!/bin/bash
set -x verbose #echo on
coffee PyToCoffee
cp trueskill.almost.coffee trueskill.coffee
patch trueskill.coffee < trueskill.patch