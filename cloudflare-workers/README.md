# Use a-skua/cf_workers.dart lib for Cloudflare Workers to send HTTP(s) requests from inside WASM

## Instructions for this devcontainer

Tested with Dart SDK [v3.5.2](https://github.com/dart-lang/sdk/releases/tag/3.5.2),
a-skua/cf_workers.dart [v1.0.0-rc.2](https://github.com/a-skua/cf_workers.dart/tree/1.0.0-rc.2),
Wrangler [v4.4.1](https://github.com/cloudflare/workers-sdk/tree/wrangler%404.4.1/packages/wrangler).

> [!NOTE]
> Please make sure you started your codespace using alternate devcontainer, `cf-workers`, since Wrangler 
> [requires](https://github.com/cloudflare/cloudflare-docs/blob/a13b9e1d90c68bb0c65ddccc8daf9528f83aa2c5/src/content/docs/workers/wrangler/install-and-update.mdx?plain=1#L24)
> glib 2.35+ .
>
> [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/wasm-outbound-http-examples/dart?devcontainer_path=.devcontainer%2Fcf-workers%2Fdevcontainer.json)

### Preparation

1. Open this repo in devcontainer, e.g. using Github Codespaces.
   Type or copy/paste following commands to devcontainer's terminal.

### Installation

1. `cd` into the folder of this example:

```sh
cd cloudflare-workers
```

2. Install the Cloudflare's Wrangler tool:

```sh
yarn add --dev wrangler
```

3. Clone the repo of a-skua/cf_workers.dart:

```sh
git clone --depth=1 https://github.com/a-skua/cf_workers.dart
```

4. `cd` into the folder of cloned repo:

```sh
cd cf_workers.dart
```

5. Ensure all dependencies are installed:

```sh
dart pub get
```

### Building

1. `cd` into the `example` subfolder, where sources of example are located:

```sh
cd example
```

2. Optionally change the URL to fetch (default value, example.com, works OK too):

```sh
sed -i.bak 's|https://example.com|https://httpbin.org/anything|' example.dart
```

3. Compile the example:

```sh
dart compile wasm example.dart -o __dart/example.wasm
```

### Test locally with Wrangler

1. Run `wrangler dev` to temporarily publish project to Web:

```sh
npx wrangler dev
```

Codespace will show you "Open in Browser" button. Just click that button or
obtain web address from "Forwarded Ports" tab.

2. You can see the result in browser, as this sample Worker acts as a dummy webproxy. 

### Deploy to Cloudflare

If you want to publish this Worker onto Cloudflare, run the deploy command (make sure you have Wrangler configured
with `wrangler login`, etc):

```sh
npx wrangler deploy
```
   

### Finish

Perform your own experiments if desired.
