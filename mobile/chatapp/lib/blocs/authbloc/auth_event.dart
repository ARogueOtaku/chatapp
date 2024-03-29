part of 'auth_bloc.dart';

@immutable
abstract class AuthEvent {}

class Login extends AuthEvent {
  final String email;
  final String password;
  Login(this.email, this.password);
}

class SignUp extends AuthEvent {
  final String email;
  final String password;
  final String name;
  SignUp(this.email, this.password, this.name);
}

class EmailVerificationCheck extends AuthEvent {
  EmailVerificationCheck();
}
