import 'package:fetch_api/fetch_api.dart';

void main() async {
  final resp = await fetch('https://httpbin.org/anything');
  final txt = await resp.text();
  print('body: ${txt}');
}
