import { Controller, Get, Inject } from '@nestjs/common';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService
} from './environmentQuestionsService';

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    @Inject('MitigationQuestionsService')
    private readonly mitigationQuestionsService: MitigationQuestionsService
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): any {
    return this.environmentQuestionsService.getQuestions();
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): any {
    return this.mitigationQuestionsService.getQuestions();
  }
}
