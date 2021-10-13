import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:chatapp/constants/api_constants.dart';

class APIServer {
  static APIServer? _instance;
  late Client _client;
  late Account _account;

  APIServer._internal() {
    _client = Client(endPoint: APIConstants.apiUrl)
        .setProject(APIConstants.projectID);
    _account = Account(_client);
  }

  static APIServer get instance {
    return _instance ??= APIServer._internal();
  }

  Future<Session> createSession(String email, String password) async {
    return await APIServer.instance._account
        .createSession(email: email, password: password);
  }

  Future<User> createUser(String email, String password, String name) async {
    return await APIServer.instance._account.create(
      email: email,
      password: password,
      name: name,
    );
  }

  Future<Token> createVerification() async {
    return await APIServer._instance!._account.createVerification(
      url: APIConstants.apiEmailVerification,
    );
  }

  Future<void> logout() async {
    return await APIServer._instance!._account
        .deleteSession(sessionId: 'current');
  }

  Future<User> getLoggedInUser() async {
    return await APIServer._instance!._account.get();
  }
}
