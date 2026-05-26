import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { useEffect, useState } from "react";
import { useGoogleAuthMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import { loggedIn } from "../store/slices/authSlice";
import { Alert, Platform } from "react-native";
import nomenclature from "../constants/nomenclature";
import { storage } from "../services/storage";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleAuth, { isLoading }] = useGoogleAuthMutation({});
  const dispatch = useDispatch();
  const balance=storage.getNumber("initialBalance") ?? 0
  // Warm up browser before it's needed
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync(); // cleanup
    };
  }, []);

  const redirectUri = makeRedirectUri({
    native:
      process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type !== "success") return;

    const idToken = response.authentication?.idToken;

    if (!idToken) {
      console.error("No ID token received — check scopes and client config");
      return;
    }
    console.log("passing",{idToken , balance});
    
    googleAuth({ idToken,balance })
      .unwrap()
      .then((res) => {console.log("Google Auth Response:", res)
        Platform.OS === "ios"
                ? Alert.prompt(
                    nomenclature.SIGN_IN_SUCCESSFUL_TITLE,
                    nomenclature.SIGN_IN_SUCCESSFUL_MESSAGE,
                  )
                : Alert.alert(
                    nomenclature.SIGN_IN_SUCCESSFUL_TITLE,
                    nomenclature.SIGN_IN_SUCCESSFUL_MESSAGE,
                  );
        dispatch(
                loggedIn({
                  user: res?.user,
                  accessToken: res?.accessToken,
                }),
              );
              storage.remove("initialBalance");
      })
      .catch((err) => console.error("Google Auth Error:", err));
  }, [response]);

  const signIn = () => {
    promptAsync();
  };

  const signOut = () => setUser(null);

  return { user, loading, request, signIn, signOut };
}
