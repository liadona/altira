import { useEffect } from "react";

export default function AdSense({ slot, format = "auto", responsive = "true" }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXX"   // ganti dengan ID kamu
      data-ad-slot={slot}              // slot iklan (dari AdSense)
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
}
