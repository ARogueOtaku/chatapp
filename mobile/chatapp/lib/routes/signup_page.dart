import 'package:chatapp/blocs/authbloc/auth_bloc.dart';
import 'package:chatapp/constants/string_constants.dart';
import 'package:chatapp/routes/login_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SignUpPage extends StatefulWidget {
  static const String routeName = 'SignUpPage';
  const SignUpPage({Key? key}) : super(key: key);

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();
  final TextEditingController _name = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey();

  void _signUp(BuildContext context) {
    if (_formKey.currentState!.validate()) {
      context.read<AuthBloc>().add(
            SignUp(
              _email.value.text,
              _password.value.text,
              _name.value.text,
            ),
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          AppStrings.signup,
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0.sp),
        child: Form(
            key: _formKey,
            child: Center(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    TextFormField(
                      controller: _name,
                      decoration: const InputDecoration(
                        labelText: AppStrings.enterName,
                      ),
                      textInputAction: TextInputAction.next,
                      keyboardType: TextInputType.name,
                      validator: (val) {
                        if (val!.isEmpty) {
                          return "Name can't be blank";
                        }
                      },
                    ),
                    TextFormField(
                      controller: _email,
                      decoration: const InputDecoration(
                        labelText: AppStrings.enterEmail,
                      ),
                      textInputAction: TextInputAction.next,
                      keyboardType: TextInputType.emailAddress,
                      validator: (val) {
                        if (val!.isEmpty) {
                          return "Email is Mandatory";
                        }
                      },
                    ),
                    TextFormField(
                      controller: _password,
                      obscureText: true,
                      decoration: const InputDecoration(
                        labelText: AppStrings.enterPassword,
                      ),
                      keyboardType: TextInputType.emailAddress,
                      onFieldSubmitted: (_) => _signUp(context),
                      validator: (val) {
                        if (val!.length < 6) {
                          return "Password should be minimum 6 characters long";
                        }
                      },
                    ),
                    SizedBox(
                      height: 20.h,
                    ),
                    BlocConsumer<AuthBloc, AuthState>(
                      listener: (context, state) {
                        if (state is SignUpError) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(state.errorMessage),
                            ),
                          );
                        }
                        if (state is SignUpDone) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('User ${state.user.name} created'),
                            ),
                          );
                          Navigator.of(context).pushNamedAndRemoveUntil(
                              LoginPage.routeName, (route) => false);
                        }
                      },
                      builder: (context, state) {
                        if (state is SignUpLoading) {
                          return const CircularProgressIndicator();
                        }
                        return ElevatedButton(
                          onPressed: () => _signUp(context),
                          child: const Text(
                            AppStrings.signup,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            )),
      ),
    );
  }
}
