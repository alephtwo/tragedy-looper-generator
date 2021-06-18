#! /usr/bin/env bash

REMOVE=(
  app.js
  app.js.LICENSE.txt
  app.js.map
  index.html
)

rm $REMOVE
npm run build
mv public/* .