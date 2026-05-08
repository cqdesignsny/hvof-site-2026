/**
 * Inline brand-icon SVGs. Lucide does not ship Facebook, Instagram, or LinkedIn
 * (brand-icon trademark scope is outside their generic-icon mission), so we
 * carry our own minimal versions here.
 */

interface IconProps {
  className?: string;
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46H15.19c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.451 20.452h-3.555v-5.569c0-1.328-.024-3.038-1.852-3.038-1.853 0-2.137 1.446-2.137 2.94v5.667H9.351V9h3.413v1.561h.05c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.064 2.064 0 1 1 0-4.13 2.064 2.064 0 0 1 0 4.13ZM7.119 20.452H3.554V9h3.564v11.452ZM22.227 0H1.77C.792 0 0 .774 0 1.726v20.547C0 23.226.792 24 1.77 24h20.452C23.205 24 24 23.226 24 22.273V1.726C24 .774 23.205 0 22.225 0h.002Z" />
    </svg>
  );
}
