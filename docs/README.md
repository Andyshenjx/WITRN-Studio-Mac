# 维简 Studio 项目介绍网站

纯静态 HTML / CSS / JavaScript，不需要安装依赖或构建。入口为 `index.html`。

**当前线上仓库使用根目录发布。** 针对仅上传 HTML 导致样式、脚本和图片路径缺失的问题，已另提供 `../website-root/index.html`：内嵌样式与脚本，引用仓库现有图片文件名。修复现有网站时使用该版本覆盖仓库根目录的 `index.html`，Pages 保持 `main → / (root)`。下文是完整上传此 `docs` 目录时的另一种方案。

页面包括产品介绍、三张应用截图、测量与 PD 功能、表盘背景与布局编辑、兼容设备说明、下载、常见问题和微信赞赏码。截图与赞赏码保留用户提供的原图。图标来自本项目已有资源。

## 发布到 GitHub Pages

1. 将整个 `docs` 文件夹上传到 `Andyshenjx/WITRN-Studio-Mac` 的 `main` 分支，保留目录结构。
2. 在 GitHub 仓库打开 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 选择 **main** 分支与 **/docs** 目录，保存。
5. 等待 GitHub Pages 部署完成，使用设置页返回的网址。默认地址应为 `https://andyshenjx.github.io/WITRN-Studio-Mac/`。

本次仅在本地创建文件，没有推送到 GitHub、启用 Pages、编译或运行验证，也没有启动浏览器预览。

## Google Search Console

Pages 发布后，添加**网址前缀资源** `https://andyshenjx.github.io/WITRN-Studio-Mac/`，不要使用 GitHub 仓库页面地址。

从该资源的验证页面下载 Google 提供的 HTML 文件，原样放到 `docs/` 根目录，与 `index.html` 同级，然后上传。等 Pages 更新后，按 Google 验证页要求检查文件网址并点击验证。也可把该资源提供的完整验证 `<meta>` 标记放进 `index.html` 的 `<head>` 中。不要根据截图中截断的内容猜测验证 token。

验证后可以提交 `https://andyshenjx.github.io/WITRN-Studio-Mac/sitemap.xml`。

## 内容维护

- `index.html`：页面文案、下载链接、兼容性及搜索/分享元数据。
- `styles.css`：布局、配色与移动端适配。
- `site.js`：截图与赞赏码放大查看；FAQ 使用原生 HTML `details`。
- `assets/`：三张截图、应用图标和赞赏码。
- `robots.txt` / `sitemap.xml`：搜索抓取入口。

更换仓库名、Pages 地址或使用自定义域名时，同步更新 `index.html` 中 canonical、Open Graph、JSON-LD，以及 `robots.txt` 和 `sitemap.xml` 中的绝对地址。素材采用相对路径，可随完整目录移动。

下载与文档入口指向当前公开的 `WITRN-Studio-Mac` 仓库，未固定发行版本号；正式发布前请确保兼容性说明与对应发行包一致。品牌声明与功能边界保留在页面中，赞赏为自愿且不影响功能。
