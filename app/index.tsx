import { ProductMark, Screen, Txt } from "@krizaka/ui/native";

import { PRODUCT } from "@/config";
import { useI18n } from "@/i18n";

/** The first screen: the product's mark and its sentence. Replace it with the product's own flows, built from @krizaka/ui blocks. */
export default function Home() {
  const { t } = useI18n();
  return (
    <Screen>
      <ProductMark id={PRODUCT as Parameters<typeof ProductMark>[0]["id"]} size={96} title={t("app.name")} />
      <Txt variant="title">{t("app.name")}</Txt>
      <Txt tone="secondary">{t("app.tagline")}</Txt>
    </Screen>
  );
}
