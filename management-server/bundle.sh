#!/bin/sh
set -e
cd "$(dirname "$0")"
npm install
rm -rf ./dist/
npm run build
BUNDLE_FOLDER=./mgmtd-1.0.0
mkdir -p ${BUNDLE_FOLDER}/usr/local/share
mv ./dist ${BUNDLE_FOLDER}/usr/local/share/mgmtd
cp package.json package-lock.json start.sh ${BUNDLE_FOLDER}/usr/local/share/mgmtd
chmod +x ${BUNDLE_FOLDER}/usr/local/share/mgmtd/start.sh
echo /usr/local/share/mgmtd/start.sh /usr/local/bin/mgmtd > ${BUNDLE_FOLDER}/mgmtd.links
mkdir -p ${BUNDLE_FOLDER}/DEBIAN
cp -R ./debian/* ${BUNDLE_FOLDER}/DEBIAN
mkdir -p ${BUNDLE_FOLDER}/lib/systemd/system
cp systemd.service ${BUNDLE_FOLDER}/lib/systemd/system/mgmtd.service
mkdir -p ${BUNDLE_FOLDER}/etc/avahi/services
cp avahi.service ${BUNDLE_FOLDER}/etc/avahi/services/mgmtd.service
mkdir -p ${BUNDLE_FOLDER}/var/lib/mgmtd
dpkg-deb --build ${BUNDLE_FOLDER}
rm -rf ${BUNDLE_FOLDER}