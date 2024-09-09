# Use Dart's package:dio to send HTTP(s) requests from inside WASM

## Instructions for this devcontainer

Tested with Dart SDK [v3.5.2](https://github.com/dart-lang/sdk/releases/tag/3.5.2), 
`packages:dio` [v5.7.0](https://pub.dev/packages/dio/versions/5.7.0),
Chrome browser v124.0, and Firefox browser v122.0.

### Preparation

1. Open this repo in devcontainer, e.g. using Github Codespaces.
   Type or copy/paste following commands to devcontainer's terminal.

### Installation

1. `cd` into the folder of this example:

```sh
cd browser-package-dio
```

2. Ensure all dependencies are installed:

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

2. As `index.html` and a 280k-sized wasm file are loaded into browser, refer to browser developer console
   to see the results.


### Finish

Perform your own experiments if desired.
