import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entity/message.entity';
import { UserService } from 'src/module/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>, 
        private usersService: UserService
      ) {}
    

      async createMessage(username: string, content: string): Promise<Message> {
        const user = await this.usersService.findOne(username); 
        const message = this.messagesRepository.create({ content, user }); 
        return this.messagesRepository.save(message); 
      }
    
      async findAll(): Promise<Message[]> {
        return this.messagesRepository.find({ relations: ['user'] });
      }
}
