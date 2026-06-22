"use client";

import type { PortfolioData } from "@/lib/types";
import type { TemplateId } from "@/lib/templates";
import { SpectrumTemplate } from "./spectrum";
import { HaloTemplate } from "./halo";
import { EmberTemplate } from "./ember";
import { EditorialTemplate } from "./editorial";
import { DevTemplate } from "./dev";
import { InkTemplate } from "./ink";

export function TemplateRenderer({
  template,
  data,
}: {
  template: TemplateId;
  data: PortfolioData;
}) {
  switch (template) {
    case "halo":
      return <HaloTemplate data={data} />;
    case "ember":
      return <EmberTemplate data={data} />;
    case "editorial":
      return <EditorialTemplate data={data} />;
    case "dev":
      return <DevTemplate data={data} />;
    case "ink":
      return <InkTemplate data={data} />;
    case "spectrum":
    default:
      return <SpectrumTemplate data={data} />;
  }
}
