#!/bin/bash
tsc
node out/index.js
chromium src/index.html --disable-web-security --user-data-dir=~/chromeTemp