import 'dart:js_interop';
import 'package:web/web.dart' as web;

void main() async {
  final resp =
      await web.window.fetch('https://httpbin.org/anything'.toJS).toDart;
  final txt = await resp.text().toDart;
  print('body: ${txt}');
}
