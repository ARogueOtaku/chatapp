import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:bloc/bloc.dart';
import 'package:chatapp/constants/api_constants.dart';
import 'package:chatapp/models/user_db.dart';
import 'package:chatapp/services/api_server.dart';
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

    on<SignUp>(
      (event, emit) async {
        try {
          emit(SignUpLoading());
          final _user = await APIServer.instance
              .createUser(event.email, event.password, event.name);
          await APIServer.instance.createSession(event.email, event.password);
          UserDB user = UserDB(
            _user.$id,
            _user.name,
            _user.email,
            false,
            DateTime.now().millisecondsSinceEpoch,
            false,
          );
          await APIServer.instance.createDocument(
            APIConstants.userDB,
            user.toMap(),
            ['role:member'],
            ['user:${_user.$id}'],
          );
          await APIServer.instance.createVerification();
          await APIServer.instance.logout();
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
      },
    );

    on<EmailVerificationCheck>(
      (event, emit) async {
        try {
          emit(
            EmailVerifyLoading(),
          );
          final user = await APIServer.instance.getLoggedInUser();
          emit(EmailVerifyLoaded(user));
        } on AppwriteException catch (e) {
          emit(
            EmailVerifyError(
              e.message.toString(),
            ),
          );
        }
      },
    );
  }
}
