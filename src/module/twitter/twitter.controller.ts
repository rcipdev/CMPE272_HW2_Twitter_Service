import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { AddTweetDto } from './dto/addTweet.dto';

@Controller('twitter')
export class TwitterController {
  constructor(private twitterService: TwitterService) {}
  @Post('add')
  addTweet(@Body() addTweetDto: AddTweetDto): Promise<string | void> {
    return this.twitterService.addTweet(addTweetDto.text);
  }

  @Delete(':id')
  deleteTweet(@Param('id', ParseIntPipe) id: number): Promise<string | void> {
    return this.twitterService.deleteTweet(id);
  }
}
