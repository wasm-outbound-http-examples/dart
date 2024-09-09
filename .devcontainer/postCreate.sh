wget -O /tmp/dart.deb https://storage.googleapis.com/dart-archive/channels/stable/release/3.5.2/linux_packages/dart_3.5.2-1_amd64.deb
sudo dpkg -i /tmp/dart.deb
rm /tmp/dart.deb
dart --disable-analytics
