import 'package:appwrite/models.dart';
import 'package:chatapp/routes/login_page.dart';
import 'package:chatapp/server/api_server.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'blocs/loginbloc/login_bloc.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  User? _user;

  @override
  void initState() {
    super.initState();
    getLoggedInUser();
  }

  Future<User> getLoggedInUser() async {
    final res = await APIServer.account.get();
    return res;
  }

  @override
  Widget build(BuildContext context) {
    debugPrint(_user?.toMap().toString());
    return MaterialApp(
      title: 'Chat App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => LoginBloc(),
          ),
        ],
        child: const Login(),
      ),
    );
  }
}
