import "./globals.css";

export const metadata = {
  title: "Next Cart — Curated for Everyday",
  description: "A modern ecommerce experience for fashion, lifestyle and everyday essentials."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="vibeback-queue" strategy="beforeInteractive">
          {`window.VibeBack=window.VibeBack||{_q:[],identify:function(u){this._q.push(['identify',u])},logout:function(){this._q.push(['logout'])},registerAction:function(n,f){this._q.push(['registerAction',n,f])}};`}
        </Script>
        <Script
          src="https://alpha.vibeback.io/widget/v1/loader.js"
          data-widget-id="wgt_uK8tL7pvjdGJTwCv"
          data-domain="archiut.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}


