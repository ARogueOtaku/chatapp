part of 'auth_bloc.dart';

@immutable
abstract class AuthState {}

class AuthInitial extends AuthState {}

class LoginError extends AuthState {
  final String errorMessage;
  LoginError(this.errorMessage);
}

class LoginDone extends AuthState {
  final User user;
  LoginDone(this.user);
}

class LoginLoading extends AuthState {}

class SignUpError extends AuthState {
  final String errorMessage;
  SignUpError(this.errorMessage);
}

class SignUpLoading extends AuthState {}

class SignUpDone extends AuthState {
  final User user;
  SignUpDone(this.user);
}
