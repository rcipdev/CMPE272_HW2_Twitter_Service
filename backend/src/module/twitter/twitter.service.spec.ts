import { TwitterService } from './twitter.service';
import axios from 'axios';

jest.mock('axios');

describe('TwitterService', () => {
  let twitterService;

  beforeEach(() => {
    twitterService = new TwitterService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a tweet', async () => {
    const text = 'Test tweet';
    const mockResponse = { data: { id: 'test-id' } };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await twitterService.addTweet(text);

    expect(result).toBe('Saved');
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.twitter.com/2/tweets',
      { text },
      {
        headers: {
          Authorization: expect.any(String),
          'user-agent': 'v2CreateTweetJS',
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
  });

  it('should delete a tweet', async () => {
    const id = 1703514442645016762;
    const mockResponse = {};

    (axios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await twitterService.deleteTweet(id);

    expect(result).toBe('Successfully Deleted');
    expect(axios.delete).toHaveBeenCalledWith(
      `https://api.twitter.com/2/tweets/${id}`,
      {
        headers: {
          Authorization: expect.any(String),
          'user-agent': 'v2CreateTweetJS',
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
  });
});
