# Ida Voss

A Next.js studio site with an editable menu, restrained motion, and smooth scrolling.

The practice is fictional. The page is here so the navigation, animation, and scroll can be tried.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit the menu

The menu starts in [`src/config/navigation.ts`](src/config/navigation.ts). Change a label, an `href`, the order, `hidden`, or a dropdown `children` list, then reload.

`href` can be:

- `/#work` for a section on the home page
- `/notes/quiet-tools` for a page
- `https://example.com` for another site

`Desk` is included and hidden. Set `hidden` to `false`, or turn Hide off in the editor, to show it.

On the page, **Edit menu** changes the same menu and saves it in this browser. Copy the TypeScript from the editor into `navigation.ts` to keep it in the project. **Reset to file** loads the file again.

Page copy lives in [`src/config/content.ts`](src/config/content.ts).
