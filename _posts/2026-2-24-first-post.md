---
title: 如何搭建个人网站兼和减号的第一篇个人博客
date: 2026-02-24 
categories: [构建]
tags: [Github，博客，记录]
---

##技术方案选择
-Github Pages 作为托管平台
-Jekyll 作为静态站点生成器
-Chirpy 作为主题

原因：免费，稳定，适合长期写博客。
---

## 实际步骤
### 1.创建仓库
仓库名必须是：用户名.github.io
这样Github才会自动识别为 Pages仓库。
---
### 2.配置主题
我使用的是 Chirpy主题
主要修改的是'_config.yml'文件，包括：
-网站标题
-作者信息
-头像路径
-时区配置
---

### 3.发布文章
文章必须放在'_posts'目录下。
命名规则必须是： 年-月-日-文件名.md
并且文件顶部必须要包括 front matter：
``` yml
---
title :文章标题
date ：日期
categories：[分类]
tages:标签
否则不会被Jekylll识别

常见问题
1.文章不显示
  原因是日期设置为未来时间，Jekklly默认不会显示未来文章。
2.页面修改后没有立即更新
  需要等待GitHub  actions构建完成
3.浏览器缓存问题
  强制刷新才能看到最新版本 可按ctrl+f5























