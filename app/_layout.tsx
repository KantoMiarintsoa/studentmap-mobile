import { AuthProvider } from "@/components/providers/AuthProvider";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {

  return (
    <AuthProvider>
      <Stack 
        screenOptions={{
          headerShown:false
        }}
      />
      <Toast/>
    </AuthProvider>
  );
}
