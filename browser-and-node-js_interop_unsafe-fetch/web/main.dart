import 'dart:js_interop';
import 'dart:js_interop_unsafe';

@JS()
external JSPromise<JSObject> fetch(JSString resource);

void main() async {
  final resp = await fetch('https://httpbin.org/anything'.toJS).toDart;
  final txt = await resp.callMethod<JSPromise<JSString>>('text'.toJS).toDart;
  print('body: ${txt}');
}
