import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddTweetDto {
  @IsNotEmpty()
  text: string;
}
