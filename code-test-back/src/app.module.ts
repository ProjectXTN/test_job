import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService,
} from './environmentQuestionsService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    EnvironmentQuestionsService,
    {
      provide: 'MitigationQuestionsService',
      useClass: MitigationQuestionsService,
    },
  ],
})
export class AppModule {}
