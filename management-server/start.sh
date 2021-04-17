#!/bin/sh
set -e
SCRIPT=$(realpath $0)
SCRIPT_PATH=$(dirname ${SCRIPT})
cd ${SCRIPT_PATH}
node ./server.js