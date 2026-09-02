import type { HtmlProps } from 'expo-router';

/**
 * Custom HTML shell for web.
 * Resets browser default margins so the app fills the full viewport.
 */
export default function Html({ lang = 'es', ...props }: HtmlProps) {
  return (
    <html lang={lang} {...props}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <style>{`*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:0;background-color:#E8DFD5;overflow-x:hidden}#root{min-height:100vh}`}</style>
      </head>
      <body>
        {props.children}
      </body>
    </html>
  );
}
