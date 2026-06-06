import { useState, useEffect, useRef } from "react";
import { GALLERY_PROMPTS } from "../data/content";

export default function GalleryImage({ prompt, alt, span, useAI }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const seed = useRef(Math.floor(Math.random() * 999999));

  const staticImages = [
    { src: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Concert crowd moshing" },
    { src: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Punk show energy" },
    { src: "https://images.pexels.com/photos/1327878/pexels-photo-1327878.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Band performing live" },
    { src: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Stage lights and crowd" },
    { src: "https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Guitarist shredding" },
    { src: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Underground show" },
    { src: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Guitar detail" },
    { src: "https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Live music atmosphere" },
  ];

  const imgIndex = GALLERY_PROMPTS.findIndex(g => g.prompt === prompt);
  const staticEntry = staticImages[imgIndex >= 0 ? imgIndex % staticImages.length : 0];
  const staticSrc = staticEntry?.src;

  useEffect(() => {
    if (!useAI) return;
    let cancelled = false;

    async function fetchImage() {
      setLoading(true);
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, seed: seed.current }),
        });
        if (!response.ok) throw new Error("Failed");
        const blob = await response.blob();
        if (!cancelled) {
          setImgSrc(URL.createObjectURL(blob));
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchImage();
    return () => { cancelled = true; };
  }, [useAI, prompt]);

  const displaySrc = imgSrc || staticSrc;

  return (
    <div className="gallery-item" style={span ? { gridColumn: `span ${span}` } : {}}>
      {loading && (
        <div className="gallery-placeholder">
          <div className="gallery-spinner" />
          <span>Generating...</span>
        </div>
      )}
      {!loading && (
        <>
          <img src={displaySrc} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="gallery-overlay" />
        </>
      )}
    </div>
  );
}
