import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:chatapp/constants/api_constants.dart';
import 'package:chatapp/models/user_db.dart';

class APIServer {
  static APIServer? _instance;
  late Client _client;
  late Account _account;
  late Database _database;

  APIServer._internal() {
    _client = Client(endPoint: APIConstants.apiUrl)
        .setProject(APIConstants.projectID);
    _account = Account(_client);
    _database = Database(_client);
  }

  static APIServer get instance {
    return _instance ??= APIServer._internal();
  }

  Future<Session> createSession(String email, String password) async {
    Session _session = await APIServer.instance._account
        .createSession(email: email, password: password);
    await checkAndUpdateLoggedInUser();
    return _session;
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

  Future<User> checkAndUpdateLoggedInUser() async {
    User _user;
    try {
      _user = await APIServer._instance!._account.get();
      DocumentList _docs = await APIServer._instance!._database.listDocuments(
        collectionId: APIConstants.userDB,
        filters: ['userid=${_user.$id}'],
      );
      UserDB _currentUser = UserDB.fromMap(_docs.documents[0].data);
      _currentUser.isOnline = true;
      await APIServer._instance!._database.updateDocument(
        collectionId: APIConstants.userDB,
        documentId: _docs.documents[0].$id,
        data: {
          'isOnline': true,
        },
      );
      return _user;
    } on AppwriteException catch (e) {
      throw Exception(e.message);
    }
  }

  Future<Document> createDocument(
      String collectionID,
      Map<dynamic, dynamic> data,
      List<dynamic> read,
      List<dynamic> write) async {
    return await APIServer._instance!._database.createDocument(
      collectionId: collectionID,
      data: data,
      read: read,
      write: write,
    );
  }
}
