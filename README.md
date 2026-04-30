order the-house-of-mamink 
client : vinus
developer : dony putra perkasa
full stack developer

============ #step1 ============
mkdir -p src/modules/{auth,gallery,profile,about}
mkdir -p src/modules/gallery/dto
mkdir -p src/modules/profile/dto
mkdir -p src/modules/about/dto
mkdir -p src/modules/auth/dto

mkdir -p src/prisma
mkdir -p src/common/{guards,decorators,interceptors,filters}
mkdir -p src/config
mkdir -p src/uploads

============ #step2 ============
rm src/app.controller.ts
rm src/app.service.ts
rm src/app.controller.spec.ts

============ #step3 ============
nest g resource modules/gallery
nest g resource modules/profile
nest g resource modules/about
nest g resource modules/auth

============ #step4 ============
rm -rf src/modules/*/entities
rm src/modules/**/*.spec.ts

============ #step5 ============
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/config
npm install bcrypt
npm install class-validator class-transformer
npm install -D @types/bcrypt

============ #step6 ============
npx prisma init
=> membuat isi schema dulu
npx prisma generate
hapus file : prisma.config.ts

=> pakai prisma v5 <=
npm uninstall prisma @prisma/client
npm install prisma@5 @prisma/client@5
npx prisma generate
npx prisma migrate dev --name init
npx prisma db push

============ #step7 ============
npm install -D @types/multer
=> agar untuk upload foto <=

============ #step8 ============
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt# the-house-of-mamink-be
