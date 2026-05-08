/**
 * Centralized image references. Most assets live on the existing thewowguys.com WP CDN.
 * When the migration is complete we can move these into /public and switch pointers.
 */

const CDN = "https://thewowguys.com/wp-content/uploads";

export const IMG = {
  marshallSterling: {
    rooftop: `${CDN}/2025/10/HVOF-Marshall-Sterling-1.jpg`,
    detail22: `${CDN}/2025/10/HVOF-Marshall-Sterling-22.jpg`,
    angle7: `${CDN}/2025/10/HVOF-Marshall-Sterling-7.jpg`,
    angle14: `${CDN}/2025/10/HVOF-Marshall-Sterling-14.jpg`,
    angle20: `${CDN}/2025/10/HVOF-Marshall-Sterling-20.jpg`,
    /** Gallery photos surfaced via the live home-page carousel. Use the -scaled.jpg variants */
    gallery: [
      `${CDN}/2025/10/HVOF-Marshall-Sterling-48-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-38-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-42-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-33-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-31-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-23-1-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-17-1-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-18-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-13-scaled.jpg`,
      `${CDN}/2025/10/HVOF-Marshall-Sterling-6-1-scaled.jpg`,
    ],
  },
  marist: {
    one: `${CDN}/2026/01/Marist-1-Large.jpeg`,
    two: `${CDN}/2026/01/Marist-2-Large.jpeg`,
    three: `${CDN}/2026/01/Marist-3-Large.jpeg`,
    four: `${CDN}/2026/01/Marist-4-Large.jpeg`,
    lobby: `${CDN}/2026/01/Marist-lobby.jpeg`,
  },
  /** Brand visuals from /public */
  logo: "/logo.svg",
  logoLight: "/logo-light.svg",
} as const;
