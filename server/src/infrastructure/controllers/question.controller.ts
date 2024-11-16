import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendQuestionDto } from '@src/application/dto/request/question/send-question.dto';
import { AuthGuard } from '@src/domain/guards/auth.guard';

@Controller('question')
@ApiTags('Question')
export class QuestionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Send a question' })
  @ApiBearerAuth()
  sendQuestion(@Body() sendQuestionDto: SendQuestionDto) {}
}
