# Updating the Live Website

Whenever you make changes to the source code, follow these two steps to push the updates to the live GitHub Pages site.

### 1. Save Your Source Code

Always commit and push your raw code to your primary branch (e.g., `main`) to keep a safe backup:

```bash
git add .
git commit -m "Describe your updates here"
git push origin main
```

### 2. Redeploy the Site

Run the deploy script. This will automatically build the newest version of your app and push it to the `gh-pages` branch:

```bash
npm run deploy
```
