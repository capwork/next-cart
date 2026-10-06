import "./globals.css";

export const metadata = {
  title: "Next Cart — Curated for Everyday",
  description: "A modern ecommerce experience for fashion, lifestyle and everyday essentials."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
