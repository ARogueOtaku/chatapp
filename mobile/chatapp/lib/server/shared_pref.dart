import 'package:appwrite/models.dart';
import 'package:shared_preferences/shared_preferences.dart';

class APISharedPrefs {
  late SharedPreferences _prefs;

  Future<void> addUserToPrefs(User _user) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setString('userid', _user.toMap().toString());
  }

  Future<String> getUserFromPrefs() async {
    _prefs = await SharedPreferences.getInstance();
    return _prefs.getString('userid') ?? '';
  }
}
