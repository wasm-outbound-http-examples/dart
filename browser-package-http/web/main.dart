import 'package:http/http.dart' as http;

void main() async {
  final resp = await http.get(Uri.parse('https://httpbin.org/anything'));
  print('body: ${resp.body}');
}
