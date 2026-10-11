# Shared Assets

Centralized static assets for Lumaris applications. The Worker serves files from
`src/assets` through Cloudflare Workers Static Assets.

## URLs

- Logos: `https://shared-assets.lumaris.fr.eu.org/logo/`
- Icons: `https://shared-assets.lumaris.fr.eu.org/icons/`

Consumers must use the absolute Worker URL above instead of copying these files
into their own frontend bundles.

## Development

```sh
npm install
npm run dev
npm run deploy
```
