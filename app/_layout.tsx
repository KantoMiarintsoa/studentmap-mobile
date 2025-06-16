import { AuthProvider } from "@/components/providers/AuthProvider";
import "@/localization/i18n";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

  return (
    <AuthProvider>
      <StripeProvider
        publishableKey={publishableKey}
      >
        <GestureHandlerRootView>
          <Stack 
            screenOptions={{
              headerShown:false
            }}
          >
            <Stack.Screen name="(protected)"/>
            <Stack.Screen name="(auth)"/>
          </Stack>
        </GestureHandlerRootView>
        <Toast/>
      </StripeProvider>
    </AuthProvider>
  );
}
