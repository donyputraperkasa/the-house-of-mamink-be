import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    AuthModule,
    GalleryModule, 
    ProfileModule,
    ActivityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
