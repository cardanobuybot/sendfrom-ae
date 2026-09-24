import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — an independent English-language guide for UAE expats sending money home.`,
  alternates: { canonical: `${site.url}/about` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">About {site.name}</h1>
      <p className="mt-4 leading-relaxed">
        {site.name} is an independent guide for the millions of expats living
        in the UAE who need to send money home. We focus on the biggest
        corridors — Philippines, India and Pakistan.
      </p>
      <p className="mt-4 leading-relaxed">
        We are not a money-transfer service, we do not hold funds, and we are
        not affiliated with any provider. We may earn a commission when
        readers use some of the links on this site. That commission does not
        change what you pay, and it does not change how we rank providers —
        see <a href="/how-we-compare" className="underline">how we compare</a>.
      </p>
      <p className="mt-4 leading-relaxed">
        Questions, corrections or partnerships:{" "}
        <a href="/contact" className="underline">contact us</a>.
      </p>
    </>
  );
}
