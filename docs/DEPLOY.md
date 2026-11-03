# 维简 Studio 网站 · 3.3.0

纯静态多页面网站，无依赖、不需要构建。保留整个目录结构，不能只上传 index.html。

- index.html：首页
- features.html：功能全览，使用本次提供的 10 张截图
- compatibility.html：19 款型号与独立功能矩阵
- guide.html：连接、记录、个性化与诊断指南
- styles.css / site.js：共享样式与图片放大交互
- assets/：原始截图、图标及赞赏码
- sitemap.xml / robots.txt / .nojekyll：静态发布与搜索入口

## GitHub Pages 发布

请先保留现有 Settings → Pages 的发布来源。若来源为 main → / (root)，将 website-root 文件夹内的全部文件和 assets 文件夹上传到仓库根目录，覆盖同名网站文件；不要覆盖项目 README、许可证、Google 验证文件或应用下载包。不要把 website-root 文件夹本身套在根目录外层。

若来源为 main → /docs，将本次 docs 文件夹的全部内容更新到仓库 docs 目录；两种方式任选一种。两份网站内容一致。新增页面采用相对链接，部署到 WITRN-Studio-Mac 子路径不需改写。

按用户要求未编译、未启动本地服务器、未运行浏览器验证。网站中的适配范围来自当前源码，并明确新增型号及维护操作待实机验证；截图展示界面，不作为兼容性验证结论。
