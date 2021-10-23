import 'dart:convert';

class UserDB {
  final String userid;
  final String name;
  final String email;
  bool isOnline;
  int lastSeen;
  bool isVerified;

  UserDB(
    this.userid,
    this.name,
    this.email,
    this.isOnline,
    this.lastSeen,
    this.isVerified,
  );

  Map<String, dynamic> toMap() {
    return {
      'userid': userid,
      'name': name,
      'email': email,
      'isOnline': isOnline,
      'lastSeen': lastSeen,
      'isVerified': isVerified,
    };
  }

  factory UserDB.fromMap(Map<String, dynamic> map) {
    return UserDB(
      map['userid'],
      map['name'],
      map['email'],
      map['isOnline'],
      map['lastSeen'],
      map['isVerified'],
    );
  }

  String toJson() => json.encode(toMap());

  factory UserDB.fromJson(String source) => UserDB.fromMap(json.decode(source));
}
