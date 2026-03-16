# 华东交通大学校园综合服务平台

## 目录结构

```text
campus-platform/
├── backend/
│   ├── src/
│   │   ├── config/            # 环境配置与数据库连接
│   │   ├── controllers/       # 控制器层（业务编排）
│   │   ├── middleware/        # JWT、Multer、错误处理中间件
│   │   ├── models/            # Mongoose 数据模型
│   │   ├── routes/            # API 路由
│   │   ├── services/          # 领域服务
│   │   ├── utils/             # 通用工具（JWT 签发）
│   │   ├── validations/       # 参数校验规则
│   │   ├── app.js             # Express 应用入口
│   │   └── server.js          # 启动文件
│   └── uploads/               # 图片上传目录
├── frontend/
│   ├── src/
│   │   ├── api/               # Axios 请求封装
│   │   ├── layouts/           # 主布局
│   │   ├── router/            # 前端路由
│   │   ├── stores/            # Pinia 状态管理
│   │   ├── styles/            # Tailwind 全局样式
│   │   └── views/             # 页面视图
│   ├── vite.config.js
│   └── tailwind.config.js
├── Dockerfile
└── ecosystem.config.cjs
```

## 快速启动

### 1. 启动后端

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2. 启动前端

```bash
cd frontend
npm install
npm run dev
```

默认前端地址：`http://localhost:5173`，后端地址：`http://localhost:5000`。

## 关键能力说明

- **邮箱注册限制**：后端使用正则 `^[A-Za-z0-9._%+-]+@(ecjtu\.edu\.cn|stu\.ecjtu\.edu\.cn)$` 严格校验学校邮箱。
- **二手交易模块**：支持多图片上传（Multer）、分类筛选、成色/价格/地点字段。
- **校园跑腿模块**：支持任务发布、赏金设置、状态追踪（待接单/进行中/已完成）。
- **个人中心模块**：聚合个人资料、发布商品、发布任务、承接任务与收藏夹。
- **工程化能力**：包含 JWT 鉴权中间件、统一参数校验中间件、Dockerfile 与 PM2 配置。
