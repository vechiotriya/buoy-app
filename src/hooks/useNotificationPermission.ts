import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Linking, AppState } from "react-native";

export function useNotificationPermission() {
  const [granted, setGranted] = useState(false);
  const openingSettings = useRef(false);

  const checkPermission = async () => {
    if (openingSettings.current) return; // skip while in settings
    const { status } = await Notifications.getPermissionsAsync();
    setGranted(status === "granted");
  };

  const requestPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") {
      setGranted(true);
      return;
    }
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus === "granted") {
      setGranted(true);
    } else {
      openingSettings.current = true;
      Linking.openSettings();
    }
  };
  const revokePermission = () => {
    openingSettings.current = true;
    setGranted(false);
    Linking.openSettings();
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        openingSettings.current = false; // back from settings, allow check
        checkPermission();
      }
    });
    checkPermission();
    return () => subscription.remove();
  }, []);

  return { granted, requestPermission, revokePermission };
}
