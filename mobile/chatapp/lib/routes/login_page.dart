import 'package:chatapp/constants/string_constants.dart';
import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextFormField(
                    decoration: const InputDecoration(
                      labelText: AppStrings.enterEmail,
                    ),
                  ),
                  TextFormField(
                    decoration: const InputDecoration(
                      labelText: AppStrings.enterPassword,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text(
                      AppStrings.login,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
