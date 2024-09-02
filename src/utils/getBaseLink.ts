export default function getBaseLink() {
  if (typeof window !== "undefined") {
    const link =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    return link;
  } else return "";
}
