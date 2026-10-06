# Mhikee · Twenty One

A ready-to-upload birthday website for GitHub Pages. No installation or build required.

## Publish your website

1. Extract this ZIP on your computer.
2. Sign in to GitHub and create a public repository named `mhikee21` (or any name you prefer).
3. In that repository choose **Add file → Upload files**. Drag the extracted files AND the `assets` folder into the upload area, then commit. `index.html` must be at the top level of the repository, not inside another folder. Upload the extracted contents, not this ZIP.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/(root)**. Click **Save**.
5. Wait for deployment. GitHub will show the website link on the Pages settings screen.

Your address will be `https://YOUR-USERNAME.github.io/mhikee21/`.
The repository name controls the last part of the address. Rename it under **Settings → General → Repository name** to change that part, then use the new address. Your GitHub username controls the first part. A custom address such as `mhikee21.com` requires separately owning that domain and configuring it in Pages.

GitHub Pages on GitHub Free uses public repositories. Uploaded files, including the birthday audio, will be publicly accessible when you publish.

## Birthday video

The site already embeds your Google Drive video. Set that video's **Share → General access → Anyone with the link → Viewer** so guests can watch it. The full video stays on Drive; it is not inside this ZIP. The included birthday audio provides another playback option.

## Edit the site

- `index.html`: text, sections, video links, image credits
- `style.css`: colors, typography, layout
- `app.js`: interactive features
- `assets/`: images and birthday audio

Keep the image credits included in the site. All file paths are relative so the site works under a GitHub repository address.

Official setup guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
