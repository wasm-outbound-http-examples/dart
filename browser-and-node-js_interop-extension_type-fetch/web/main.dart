import 'dart:js_interop';

@JS()
external JSPromise<Response> fetch(JSString resource);

extension type Response(JSObject _) implements JSObject {
  @JS()
  external JSPromise<JSString> text();
}

void main() async {
  final Response resp = await fetch('https://httpbin.org/anything'.toJS).toDart;
  final txt = await resp.text().toDart;
  print('body: ${txt}');
}
