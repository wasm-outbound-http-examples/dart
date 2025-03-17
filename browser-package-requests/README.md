# Use Dart's package:requests to send HTTP(s) requests from inside WASM

## Instructions for this devcontainer

Tested with Dart SDK [v3.5.2](https://github.com/dart-lang/sdk/releases/tag/3.5.2), 
`package:requests` [v5.0.0](https://github.com/jossef/requests/releases/tag/5.0.0),
Chrome browser v133.0, and Firefox browser v135.0.

### Preparation

1. Open this repo in devcontainer, e.g. using Github Codespaces.
   Type or copy/paste following commands to devcontainer's terminal.

### Installation

1. `cd` into the folder of this example:

```sh
cd browser-package-requests
```

2. It appears the latest dart-requests' version 5.0.0 is not published on pub.dev, wherefore this library 
is installed from Github repo directly. Ensure all dependencies are installed:

```sh
dart pub get
```

### Building

1. `cd` into the `web` subfolder, where sources are located:

```sh
cd web
```

2. Compile the example:

```sh
dart compile wasm main.dart
```

### Test with browser

1. Run simple HTTP server to temporarily publish project to Web:

```sh
python3 -m http.server
```

Codespace will show you "Open in Browser" button. Just click that button or
obtain web address from "Forwarded Ports" tab.

2. As `index.html` and a 193k-sized wasm file are loaded into browser, refer to browser developer console
   to see the results.


### Finish

Perform your own experiments if desired.
