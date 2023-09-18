import { Injectable } from '@nestjs/common';
import axios from 'axios';
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const fs = require('fs');

let twitterKey: string,
  twitterSecret: string,
  token: string,
  secret: string,
  oauth: any,
  atoken;

@Injectable()
export class TwitterService {
  constructor() {
    twitterKey = process.env.TWITTER_KEY;
    twitterSecret = process.env.TWITTER_SECRET;
    token = process.env.TOKEN;
    secret = process.env.SECRET;
    oauth = OAuth({
      consumer: {
        key: twitterKey,
        secret: twitterSecret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (baseString, key) =>
        crypto.createHmac('sha1', key).update(baseString).digest('base64'),
    });
    atoken = {
      key: token,
      secret: secret,
    };
  }

  async addTweet(text: string): Promise<string | void> {
    try {
      const authHeader = oauth.toHeader(
        oauth.authorize(
          {
            url: 'https://api.twitter.com/2/tweets',
            method: 'POST',
          },
          atoken,
        ),
      );
      const data = { text };
      console.log(data);
      return await axios
        .post('https://api.twitter.com/2/tweets', data, {
          headers: {
            Authorization: authHeader['Authorization'],
            'user-agent': 'v2CreateTweetJS',
            'content-type': 'application/json',
            accept: 'application/json',
          },
        })
        .then(async (odata) => {
          await fs.readFile('twitter.json', async function (err, data) {
            let tweetsOf;
            if (data == undefined) tweetsOf = [];
            else tweetsOf = JSON.parse(data);
            tweetsOf.push(odata.data);
            await fs.writeFile(
              'twitter.json',
              JSON.stringify(tweetsOf),
              (err) => {
                if (err) throw err;
                console.log('Done writing');
              },
            );
          });
          return 'Saved';
        })
        .catch((error) => {
          console.log(error);
          return 'Failed';
        });
    } catch (error) {
      console.log(error);
      return 'Failed';
    }
  }

  async deleteTweet(id: number): Promise<string | void> {
    try {
      const authHeader = oauth.toHeader(
        oauth.authorize(
          {
            url: `https://api.twitter.com/2/tweets/${id}`,
            method: 'DELETE',
          },
          atoken,
        ),
      );
      return await axios
        .delete(`https://api.twitter.com/2/tweets/${id}`, {
          headers: {
            Authorization: authHeader['Authorization'],
            'user-agent': 'v2CreateTweetJS',
            'content-type': 'application/json',
            accept: 'application/json',
          },
        })
        .then(async (data) => {
          await fs.readFile('twitter.json', async function (err, data) {
            let tweetsOf = JSON.parse(data);
            if (Array.isArray(tweetsOf) && tweetsOf.length > 0) {
              let ind = tweetsOf.findIndex((tweet) => {
                if (tweet.data && tweet.data.id)
                  return tweet.data.id.toString() == id;
              });
              if (ind != -1) tweetsOf.splice(ind, 1);
            } else {
              tweetsOf = [];
            }
            await fs.writeFile(
              'twitter.json',
              JSON.stringify(tweetsOf),
              (err) => {
                if (err) throw err;
                console.log('Done writing');
              },
            );
          });
          return 'Successfully Deleted';
        })
        .catch((error) => {
          console.log(error);
          return 'Failed';
        });
    } catch (error) {
      console.log(error);
      return 'Failed';
    }
  }
}
