import { DiscoveryProvider } from "@krizaka/discovery/react";
import { KrizakaQueryProvider } from "@krizaka/query";
import { brands } from "@krizaka/tokens/native";
import { ThemeProvider } from "@krizaka/ui/native";
import { Stack } from "expo-router";
import * as React from "react";
import { AppState } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { discovery, PRODUCT } from "@/config";
import { currentLocale, I18nProvider } from "@/i18n";

/** A refresh of the signed manifest each time the app comes back to the foreground. */
const onForeground = (callback: () => void) => {
  const subscription = AppState.addEventListener("change", (state) => state === "active" && callback());
  return () => subscription.remove();
};

/** The theme keeps its bars and buttons clear of the notch and the home indicator: it needs the safe-area insets. */
function Themed({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <ThemeProvider overrides={brands[PRODUCT as keyof typeof brands]} insets={insets}>
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Themed>
        <DiscoveryProvider discovery={discovery} subscribeForeground={onForeground}>
          <KrizakaQueryProvider throwOnError={false}>
            <I18nProvider locale={currentLocale()}>
              <Stack screenOptions={{ headerShown: false }} />
            </I18nProvider>
          </KrizakaQueryProvider>
        </DiscoveryProvider>
      </Themed>
    </SafeAreaProvider>
  );
}
