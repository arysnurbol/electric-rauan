import { RootDocument, rootMetadata, rootViewport } from "@/components/RootDocument";
import { fontClassesKk } from "../fonts-kk";
import "../globals.css";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function KkLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="kk" fontClasses={fontClassesKk}>{children}</RootDocument>;
}
