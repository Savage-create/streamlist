import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [evt, setEvt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setEvt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!evt) return null;

  const install = async () => {
    evt.prompt();
    const { outcome } = await evt.userChoice;
    console.log("PWA install:", outcome);
    setEvt(null);
  };

  return (
    <button
      onClick={install}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        background: "#e50914",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "10px 14px",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,.4)",
      }}
      aria-label="Install StreamList"
    >
      Install App
    </button>
  );
}
