import 'package:requests/requests.dart';

void main() async {
  final resp = await Requests.get('https://httpbin.org/anything');
  print('body: ${resp.content()}');
}
