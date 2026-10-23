# __Name__ mobile — agent contract

> Started from `krizaka/template-expo-app`. Decision: [ADR-004](https://github.com/krizaka/.github/blob/main/docs/adr/ADR-004-expo-app-shell.md).

- The logic every Krizaka Expo app shares is `@krizaka/app-client`; never copy it. A missing piece goes to krizaka-ui, then is used here.
- Screens are built from `@krizaka/ui` native blocks and templates, never hand-built. Words live in `src/i18n/{fr,en}.json` (French first).
- The URL is the state: every screen is an Expo Router route with the web's path.
- Store builds are local (`eas build --local`); no EAS cloud build, none per pull request.
- Test first; `pnpm lint && pnpm typecheck && pnpm test` before a push.
