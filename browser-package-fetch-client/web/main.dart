import 'package:fetch_client/fetch_client.dart';

void main() async {
  final client = FetchClient(mode: RequestMode.cors);
  final uri = Uri.parse('https://httpbin.org/anything');
  final resp = await client.get(uri);

  print('${resp.body}');
  client.close();
}
