#!/usr/bin/env bash
# client install


cd client
npm install

cd ..
npm install

echo "starting server in new tab..."


osascript 2>/dev/null <<EOF
  tell application "System Events"
    tell process "Terminal" to keystroke "t" using command down
  end
  tell application "Terminal"
    activate
    do script with command "cd \"$PWD\"; npm start" in window 1
  end tell
EOF

osascript 2>/dev/null <<EOF
  tell application "System Events"
    tell process "Terminal" to keystroke "t" using command down
  end
  tell application "Terminal"
    activate
    do script with command "cd \"$PWD\"; cd client; npm run bundle" in window 1
  end tell
EOF

