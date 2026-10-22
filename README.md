# template-expo-app

Start a Krizaka **Expo app** (iOS and Android) from this template. It only *wires*: the logic every Expo app shares is
[`@krizaka/app-client`](https://ui.krizaka.com/packages/app-client) (session, discovery, API client), the screens are built from
[`@krizaka/ui`](https://ui.krizaka.com) native blocks, and the decision is
[ADR-004](https://github.com/krizaka/.github/blob/main/docs/adr/ADR-004-expo-app-shell.md).

```bash
# 1. Create the product's repository from this template (GitHub: « Use this template »), clone it, then:
node scripts/init.mjs yomizaka "Yomizaka"     # replaces __slug__ and __Name__
pnpm install
pnpm lint && pnpm typecheck && pnpm test
pnpm ios                                       # or: pnpm android
```

A product inside a monorepo (`apps/mobile`) takes this folder as `apps/mobile` and joins the workspace.

| File | What it is |
| :-- | :-- |
| `app.json`, `eas.json` | Identity (`com.krizaka.<slug>`), the scheme, the EAS profiles |
| `src/config.ts` | The wiring: discovery (the signed manifest of krizaka.com), session in the Keychain / Keystore, API client |
| `app/_layout.tsx` | Theme (the product's brand, light and dark, safe areas), discovery, queries, language |
| `plugins/with-release-signing.js` | Signs the Android release with the upload key named by the environment (tested) |
| `.github/workflows/ci.yml` | The org's `expo-ci` (lint, types, tests, bundle export, `expo-doctor`) |
| `.maestro/smoke.yaml` | The first screen opens, on a simulator |

## Builds and stores

- **Never EAS cloud builds** (the free plan is small): build locally, `eas build --local` or Xcode and Gradle, then submit.
- iOS: Xcode archive signed with the distribution certificate, then TestFlight (the App Store Connect record is created by hand once).
- Android: `./gradlew assembleRelease bundleRelease` with `KRIZAKA_ANDROID_KEYSTORE`, `…_KEYSTORE_PASSWORD`, `…_KEY_ALIAS`, `…_KEY_PASSWORD` set.
- The URL is the state: every screen is an Expo Router route with the web's path, and `associatedDomains` and Android `autoVerify`
  are added once the product's web serves its `apple-app-site-association` and `assetlinks.json`.
