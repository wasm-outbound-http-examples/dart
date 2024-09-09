import 'package:dio/dio.dart';

void main() async {
  final dio = Dio();
  Response response = await dio.get('https://httpbin.org/anything');
  print(response);
}
