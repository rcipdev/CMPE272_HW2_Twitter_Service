import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { AddTweetDto } from './dto/addTweet.dto';

describe('TwitterController', () => {
  let twitterController;
  let twitterService;

  beforeEach(() => {
    twitterService = new TwitterService();
    twitterController = new TwitterController(twitterService);
  });

  it('should add a tweet', async () => {
    const addTweetDto = { text: 'Test tweet' };
    const expectedResult = 'Saved';

    jest.spyOn(twitterService, 'addTweet').mockResolvedValue(expectedResult);

    const result = await twitterController.addTweet(addTweetDto);

    expect(result).toBe(expectedResult);
    expect(twitterService.addTweet).toHaveBeenCalledWith(addTweetDto.text);
  });

  it('should delete a tweet', async () => {
    const tweetId = 123;
    const expectedResult = 'Successfully Deleted';

    jest.spyOn(twitterService, 'deleteTweet').mockResolvedValue(expectedResult);

    const result = await twitterController.deleteTweet(tweetId);

    expect(result).toBe(expectedResult);
    expect(twitterService.deleteTweet).toHaveBeenCalledWith(tweetId);
  });
});
