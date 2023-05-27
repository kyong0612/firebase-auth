#!/bin/bash

file="firebase-config.sample.js"
temp_file="temp-firebase-config.js"

(sed 's/\".*\"/\"xxxxx\"/g' $file) > $temp_file

mv $temp_file $file

echo "#### DONE ####"
cat $file
