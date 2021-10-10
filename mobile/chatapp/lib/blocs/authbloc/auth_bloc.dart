import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:bloc/bloc.dart';
import 'package:chatapp/services/api_server.dart';
import 'package:chatapp/services/shared_pref.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<Login>((event, emit) async {
      try {
        emit.call(LoginLoading());
        await APIServer.instance.createSession(
          event.email,
          event.password,
        );
        final user = await APIServer.instance.getLoggedInUser();
        await APISharedPrefs().addUserToPrefs(user);
        emit.call(
          LoginDone(
            user,
          ),
        );
      } on AppwriteException catch (e) {
        emit.call(
          LoginError(
            e.message.toString(),
          ),
        );
      }
    });

    on<SignUp>((event, emit) async {
      try {
        emit(SignUpLoading());
        final _user = await APIServer.instance
            .createUser(event.email, event.password, event.name);
        emit(
          SignUpDone(_user),
        );
      } on AppwriteException catch (e) {
        emit(
          SignUpError(
            e.message.toString(),
          ),
        );
      }
    });
  }
}
