/**
 * Inline script that runs before paint to apply the saved theme to <html>.
 * Prevents the "flash of wrong theme" on initial load.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('hvof-floorplan-theme');var d='dark';if(t==='light'||t==='dark'){d=t;}else{d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;if(d==='dark'){r.classList.add('dark');}else{r.classList.remove('dark');}r.dataset.adminTheme=d;}catch(e){}})();`;

export function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
