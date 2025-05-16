# Stage 1: Build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN echo "VITE_API_URL is set to: $VITE_API_URL" 
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with a static server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


