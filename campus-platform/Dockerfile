# 多阶段构建：前端打包 + 后端运行
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM node:20-alpine AS backend-runtime
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --omit=dev
COPY backend ./
COPY --from=frontend-builder /app/frontend/dist ../frontend-dist

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]
