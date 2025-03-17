# Use dart:js_interop, extension types, and fetch() to send HTTP(s) requests from inside WASM

## Instructions for this devcontainer

Tested with Dart SDK [v3.5.2](https://github.com/dart-lang/sdk/releases/tag/3.5.2),
Bun 1.2.4, Deno 2.2.3, Node.js 23.9.0, Chrome browser v133.0, and Firefox browser v135.0 .

### Preparation

1. Open this repo in devcontainer, e.g. using Github Codespaces.
   Type or copy/paste following commands to devcontainer's terminal.

### Installation

1. `cd` into the folder of this example:

```sh
cd browser-and-node-js_interop-extension_type-fetch
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

2. As `index.html` and a 60k-sized wasm file are loaded into browser, refer to browser developer console
   to see the results.

### Test with Node.js

1. Run with Node.js:

```sh
node node-and-deno.mjs
```

### Test with Bun

1. Install Bun:

```sh
curl -fsSL https://bun.sh/install | bash
```

2. Run with Bun:

```sh
~/.bun/bin/bun node-and-deno.mjs
```

### Test with Deno

1. Install Deno:

```sh
curl -fsSL https://deno.land/install.sh | bash -s -- --yes
```

2. Run with Deno:

```sh
~/.deno/bin/deno run --allow-read --allow-net node-and-deno.mjs
```

### Finish

Perform your own experiments if desired.
