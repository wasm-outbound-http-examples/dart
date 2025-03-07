# Use dart:js_interop_unsafe and fetch() to send HTTP(s) requests from inside WASM

## Instructions for this devcontainer

Tested with Dart SDK [v3.5.2](https://github.com/dart-lang/sdk/releases/tag/3.5.2),
Bun 1.2.4, Deno 2.2.3, Node.js 23.9.0, Chrome browser v133.0, and Firefox browser v135.0 .

> [!NOTE]
> Note that Dart SDK docs [recommend](https://github.com/dart-lang/sdk/blob/3.8.0-168.0.dev/sdk/lib/js_interop_unsafe/js_interop_unsafe.dart#L12-L22)
> to use `dart:js_interop_unsafe` with some level of caution due to lesser number of static checks and weaker typing.
> You may consider using [`package:fetch_api`](https://pub.dev/packages/fetch_api) ([example](../browser-and-node-package-fetch-api/README.md))
> ( or its `HttpClient` implementation, [`package:fetch_client`](https://pub.dev/packages/fetch_client) ([example](../browser-and-node-package-fetch-client/README.md)) ), 
> which does the same thing in type-safe and statically analysable manner. 

### Preparation

1. Open this repo in devcontainer, e.g. using Github Codespaces.
   Type or copy/paste following commands to devcontainer's terminal.

### Installation

1. `cd` into the folder of this example:

```sh
cd browser-and-node-js_interop_unsafe-fetch
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
