import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendQuestionCommand } from '@src/application/command/question/interfaces';
import { GetListQuestionsDto } from '@src/application/dto/request/question/get-list.dto';
import { SendQuestionDto } from '@src/application/dto/request/question/send-question.dto';
import { GetListQuestionsQuery } from '@src/application/queries/question/interfaces';
import { AuthUser } from '@src/common/decorators/auth-user.decorator';
import { AuthGuard } from '@src/domain/guards/auth.guard';

@Controller('question')
@ApiTags('Question')
export class QuestionController {
  constructor(
    private readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get historical question' })
  @ApiBearerAuth()
  getListQuestions(@AuthUser() user, @Query() getListQuestionsDto: GetListQuestionsDto) {
    return this.queryBus.execute(new GetListQuestionsQuery(user.id, getListQuestionsDto));
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Send a question' })
  @ApiBearerAuth()
  sendQuestion(@AuthUser() user, @Body() sendQuestionDto: SendQuestionDto) {
    return this.commandBus.execute(new SendQuestionCommand(user.id, sendQuestionDto));
  }
}
