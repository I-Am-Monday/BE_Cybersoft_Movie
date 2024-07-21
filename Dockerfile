# Sử dụng image Node.js chính thức
FROM node:19.9.0

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và yarn.lock vào container
COPY package.json yarn.lock ./

# Cài đặt các phụ thuộc
RUN yarn install

# Sao chép mã nguồn vào container
COPY . .

# Xây dựng ứng dụng (nếu cần)
# RUN yarn build

# Cung cấp cổng mà ứng dụng sẽ lắng nghe
EXPOSE 8080

# Khởi động ứng dụng
CMD ["yarn", "start"]
