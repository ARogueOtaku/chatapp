import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:chatapp/constants/api_constants.dart';

class APIServer {
  static APIServer? _instance;
  late Client _client;
  late Account _account;

  APIServer._internal() {
    _client = Client(endPoint: APIConstants.apiUrl)
        .setProject(APIConstants.projectID)
        .setSelfSigned();
    _account = Account(_client);
  }

  static APIServer get instance {
    return _instance ??= APIServer._internal();
  }

  static Account get account {
    return APIServer.instance._account;
  }

  static Future<User> get currentUser async {
    return await APIServer.instance._account.get();
  }

  Future<Session> createSession(String email, String password) async {
    return await APIServer.account
        .createSession(email: email, password: password);
  }
}
