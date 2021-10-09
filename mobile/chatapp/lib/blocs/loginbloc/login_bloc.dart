import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:bloc/bloc.dart';
import 'package:chatapp/server/api_server.dart';
import 'package:chatapp/server/shared_pref.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc() : super(LoginInitial()) {
    on<Login>((event, emit) async {
      try {
        emit.call(LoginLoading());
        await APIServer.instance.createSession(
          event.email,
          event.password,
        );
        final user = await APIServer.account.get();
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
  }
}
