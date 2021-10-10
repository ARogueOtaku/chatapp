import 'package:chatapp/blocs/authbloc/auth_bloc.dart';
import 'package:chatapp/constants/string_constants.dart';
import 'package:chatapp/routes/home_page.dart';
import 'package:chatapp/routes/signup_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class LoginPage extends StatefulWidget {
  static const String routeName = 'Login';
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  final TextEditingController _email = TextEditingController();

  final TextEditingController _password = TextEditingController();

  void _login(BuildContext context) {
    if (_formKey.currentState!.validate()) {
      context.read<AuthBloc>().add(
            Login(_email.text, _password.text),
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _formKey,
        child: Padding(
          padding: EdgeInsets.all(16.0.sp),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextFormField(
                    controller: _email,
                    decoration: const InputDecoration(
                      labelText: AppStrings.enterEmail,
                    ),
                    textInputAction: TextInputAction.next,
                    keyboardType: TextInputType.emailAddress,
                    validator: (data) {
                      if (data != null) {
                        if (data.isEmpty) {
                          return 'Email is Mandatory';
                        }
                      }
                    },
                  ),
                  TextFormField(
                    controller: _password,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: AppStrings.enterPassword,
                    ),
                    textInputAction: TextInputAction.done,
                    keyboardType: TextInputType.visiblePassword,
                    validator: (data) {
                      if (data != null) {
                        if (data.isEmpty) {
                          return 'Email is Mandatory';
                        } else if (data.length < 6) {
                          return 'Password should be more than 6 characters long';
                        }
                      }
                    },
                    onFieldSubmitted: (_) => _login(context),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  BlocConsumer<AuthBloc, AuthState>(
                    listener: (context, state) {
                      if (state is LoginLoading) {
                        debugPrint('Loding');
                      }
                      if (state is LoginError) {
                        debugPrint(state.errorMessage);
                      }
                      if (state is LoginDone) {
                        Navigator.of(context).pushNamedAndRemoveUntil(
                            HomePage.routeName, (route) => false);
                      }
                    },
                    builder: (context, state) {
                      if (state is LoginLoading) {
                        return const CircularProgressIndicator();
                      }
                      return ElevatedButton(
                        onPressed: () => _login(context),
                        child: const Text(
                          AppStrings.login,
                        ),
                      );
                    },
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).pushNamed(
                        SignUpPage.routeName,
                      );
                    },
                    child: const Text(AppStrings.signup),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
