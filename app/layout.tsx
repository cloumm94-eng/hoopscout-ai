import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HoopScout AI · Basketball, understood.",
  description: "Explore a professional player’s season and generate a transparent, data-grounded scouting report.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
