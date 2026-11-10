import { RootDocument, rootMetadata, rootViewport } from "@/components/RootDocument";
import { fontClassesRu } from "../fonts-ru";
import "../globals.css";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ru" fontClasses={fontClassesRu}>{children}</RootDocument>;
}
