# Replace Favicon with GBI Logo

## Steps

1. Download `https://www.gulfbrandsinternational.com/wp-content/themes/gbi/images/favicon.png` into `public/favicon.png` (already downloaded — 5KB PNG).
2. Update `src/routes/__root.tsx` to register the favicon in the route head's `links` array:
   ```ts
   { rel: "icon", type: "image/png", href: "/favicon.png" }
   ```

This makes the GBI favicon appear in the browser tab.
