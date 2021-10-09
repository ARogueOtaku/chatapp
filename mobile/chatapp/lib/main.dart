import 'package:appwrite/models.dart';
import 'package:chatapp/routes/home_page.dart';
import 'package:chatapp/routes/login_page.dart';
import 'package:chatapp/server/api_server.dart';
import 'package:chatapp/server/shared_pref.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(390.0, 844.0),
      builder: () {
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
            child: FutureBuilder(
              future: APIServer.currentUser,
              builder: (ctx, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Scaffold(
                    body: Center(
                      child: CircularProgressIndicator(),
                    ),
                  );
                }
                if (snapshot.hasData) {
                  APISharedPrefs().addUserToPrefs(snapshot.data as User);
                  return const HomePage();
                } else {
                  return LoginPage();
                }
              },
            ),
          ),
          routes: {
            LoginPage.routeName: (ctx) => LoginPage(),
            HomePage.routeName: (ctx) => const HomePage(),
          },
        );
      },
    );
  }
}
