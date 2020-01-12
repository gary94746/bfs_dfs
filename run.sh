#!/bin/bash
tsc
node out/Index.js
chromium src/index.html --disable-web-security --user-data-dir=~/chromeTemp
