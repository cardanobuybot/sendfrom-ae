import ProviderPage, { providerMetadata } from "@/components/ProviderPage";
export const metadata = providerMetadata("revolut");
export default function Page() { return <ProviderPage slug="revolut" />; }
