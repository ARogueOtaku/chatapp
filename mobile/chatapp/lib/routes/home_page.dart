import 'package:chatapp/blocs/authbloc/auth_bloc.dart';
import 'package:chatapp/routes/bottom_app_bar_home.dart';
import 'package:chatapp/widgets/email_not_verified.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HomePage extends StatefulWidget {
  static const String routeName = 'HomePage';
  const HomePage({Key? key}) : super(key: key);
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    context.read<AuthBloc>().add(EmailVerificationCheck());
  }

  void onTap() {
    context.read<AuthBloc>().add(EmailVerificationCheck());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocConsumer<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is EmailVerifyError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.message),
              ),
            );
          }
        },
        builder: (context, state) {
          if (state is EmailVerifyLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          if (state is EmailVerifyLoaded) {
            if (state.user.emailVerification) {
              return const CustomBottomAppBar();
            } else {
              return EmailNotVerified(
                onTap: onTap,
              );
            }
          }
          return EmailNotVerified(
            onTap: onTap,
          );
        },
      ),
    );
  }
}

/**
 * 
 */