import 'package:chatapp/blocs/authbloc/auth_bloc.dart';
import 'package:chatapp/routes/home_page.dart';
import 'package:chatapp/routes/login_page.dart';
import 'package:chatapp/routes/signup_page.dart';
import 'package:chatapp/services/api_server.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() async {
  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (ctx) => AuthBloc(),
        ),
      ],
      child: const MyApp(),
    ),
  );
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
          debugShowCheckedModeBanner: false,
          title: 'Chat App',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: FutureBuilder(
            future: APIServer.instance.checkAndUpdateLoggedInUser(),
            builder: (ctx, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Scaffold(
                  body: Center(
                    child: CircularProgressIndicator(),
                  ),
                );
              }
              if (snapshot.hasData) {
                //debugPrint((snapshot.data as User).toMap().toString());
                return const HomePage();
              } else {
                //debugPrint(snapshot.error.toString());
                return const LoginPage();
              }
            },
          ),
          routes: {
            LoginPage.routeName: (ctx) => const LoginPage(),
            HomePage.routeName: (ctx) => const HomePage(),
            SignUpPage.routeName: (ctx) => const SignUpPage(),
          },
        );
      },
    );
  }
}
