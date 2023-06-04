import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService
} from './environmentQuestionsService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        EnvironmentQuestionsService,
        {
          provide: 'MitigationQuestionsService',
          useClass: MitigationQuestionsService
        }
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return some environment questions', () => {
      expect(appController.getEnvironmentQuestions().length).toBeGreaterThan(0);
    });

    it('should return some mitigation questions', () => {
      expect(appController.getMitigationQuestions().length).toBeGreaterThan(0);
    });
  });
});
