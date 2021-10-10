part of 'login_bloc.dart';

@immutable
abstract class LoginState {}

class LoginInitial extends LoginState {}

class LoginError extends LoginState {
  final String errorMessage;
  LoginError(this.errorMessage);
}

class LoginDone extends LoginState {
  final User user;
  LoginDone(this.user);
}

class LoginLoading extends LoginState {}
