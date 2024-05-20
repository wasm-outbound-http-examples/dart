wget -O /tmp/dart.deb https://storage.googleapis.com/dart-archive/channels/stable/release/3.4.0/linux_packages/dart_3.4.0-1_amd64.deb
sudo dpkg -i /tmp/dart.deb
rm /tmp/dart.deb
dart --disable-analytics
