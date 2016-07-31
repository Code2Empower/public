Resource Finder
======

A Page Crawler That Locates all the Resources on a site, and Generates the Paths to Multiple Locales
------

**Intended for: Developers who want to generate a list of files on thier site.  For example, to create a list of files to send to a CDN to be invalidated, or to audit a site.*


Demo Instructions
------
1. Download the scriptlet.js.
2. Save the code as a bookmark.
3. Visit `https://webmadeclear.com/resource-finder-demo.html`.
4. Click the bookmark, make sure that the popup window is not blocked.  If it is, allow popups, refresh the page, and try again.
5. In the popup window: Confirm what type of files you want, select the locales, and click 'Generate Files'.

Setup Instructions
------
1. Download the files from the repo.
2. Configure the scriptlet-source-code.js to point to the folder where you will upload the resources.
3. Minify the scriptlet-source-code.js, and save as a bookmark in your browser.
4. In `crawl.js` replace all instances of `https://webmadeclear.com/public/demos/resource-finder/` with the folder location for your modified script.
5. In `crawl.js` find the `createArrays` Function and add any custom criteria for finding images in non-standard locations ~line:49-90.
6. In `crawl.js` add a `validURLKey` and an `invalidURLKey`, to determine the types of urls to allow or ignore.
7. In `window.js` set the location of the localization in your url ~line 42-43.
8. Save and upload: `crawl.js`, `window.js`, `window.css`, and `background.png` to your source folder.

Use Instructions
------
0. Configure the scripts (See: Setup Instructions).
1. Save the code from `scriptlet.js` as a bookmark.
2. Visit the site you wish to locate resources on.
3. Click the bookmark, make sure that the popup window is not blocked.  If it is, allow popups, refresh the page, and try again.
4. In the popup window: Confirm what type of files you want, select the locales, and click 'Generate Files'.

Files
------
- `scriptlet.js`  =>  contains the scriptlet code for the bookmark
- `crawl.js` => attached to the gamepage via `scriptlet.js`; it finds all of the page assets and opens a new window (`win`) for the user to select the resource criteria
- `window.js` => attached to the `win`; this script handles the logic to build the urls
- `window.css` => attached to the `win`; this styles the `win`
- `README.md` => the readme file
- `scriptlet-source-code.js` => the unminified code of `scriptlet.js` for review and maintenence
- `window-template.html` => the unminified code of `win` for review and maintenence