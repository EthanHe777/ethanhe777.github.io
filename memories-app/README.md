# 定南中学时光档案馆（Dingnan High School Memories）MVP

一个按“毕业届别 + 班级”组织的在线相册与回忆平台，支持上传老照片、留言互动和同学搜索。

## 1. 技术栈

- 前端：Next.js 14 + React + TailwindCSS
- 后端：Node.js + Express + PostgreSQL
- 存储：MVP 默认本地文件存储（`backend/uploads`）
- 部署：Docker Compose（一键运行）

## 2. 目录结构

```txt
memories-app/
├─ frontend/                # Next.js 前端
├─ backend/                 # Express API
├─ database/
│  └─ schema.sql            # PostgreSQL 表结构
└─ docker-compose.yml       # 本地/云服务器部署
```

## 3. 核心页面（前端）

- `/` 首页
- `/classes` 班级列表
- `/classes/[id]` 班级相册瀑布流
- `/photos/[id]` 照片详情+评论
- `/profile/[id]` 用户个人页（MVP 占位）
- `/upload` 上传照片

## 4. API 设计（后端）

### 鉴权
- `POST /api/auth/register`
- `POST /api/auth/login`

### 班级
- `GET /api/classes` 班级列表
- `GET /api/classes/:id` 班级详情 + 相册

### 照片
- `POST /api/photos`（Bearer Token + multipart/form-data）
- `GET /api/photos/:id`

### 评论
- `POST /api/comments`

### 搜索
- `GET /api/search?graduationYear=&className=&studentName=`

## 5. 本地运行

### 方案 A：Docker（推荐）

```bash
cd memories-app
docker compose up --build
```

访问：
- 前端：http://localhost:3000
- 后端健康检查：http://localhost:4000/api/health

### 方案 B：手动运行

#### 1) 数据库
1. 创建 PostgreSQL 数据库 `dingnan_memories`
2. 执行 `database/schema.sql`

#### 2) 启动后端
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### 3) 启动前端
```bash
cd frontend
npm install
npm run dev
```

## 6. 校友真实性与安全设计建议

1. **防陌生人进入班级**
   - 班级配置 `join_code`（邀请码）
   - 班级管理员审批入班
   - 未入班用户仅能看到模糊封面，不能查看原图

2. **校友验证机制**
   - 注册时填写届别、班级、中文名
   - 增加“同班同学背书”：2 位已认证同学确认后自动转 `verified`
   - 可选上传毕业证/校卡局部（后台人工审核后删除原件）

3. **防恶意内容上传**
   - 图片大小、格式限制（已做）
   - 接入内容审核（如 AWS Rekognition / 阿里云内容安全）
   - 照片和评论增加 `moderation_status` 与举报入口

4. **怀旧感产品设计**
   - 胶片/泛黄配色、手写字体点缀
   - 时间轴模式：按“高一-高二-高三”浏览
   - “今日回忆”功能：每年同一天推荐历史照片
   - 班级公共记忆地图（教室、操场、食堂）

## 7. 生产部署建议

### 方案 1：Vercel + 云主机 API
- 前端部署 Vercel（CDN + HTTPS）
- 后端部署到云服务器 Docker
- PostgreSQL 可用 RDS/Neon/Supabase
- 对象存储替换本地上传（S3 / OSS）

### 方案 2：单台云服务器 Docker Compose
- Nginx 反向代理 + HTTPS（Let's Encrypt）
- `docker compose up -d --build`
- 定时备份数据库与对象存储

## 8. 后续迭代路线

- 班级管理员后台（审批、封禁、内容管理）
- 私信与@同学提醒
- OCR 老照片文字识别，自动生成标签
- AI 回忆故事辅助生成（根据照片时间/人物）
