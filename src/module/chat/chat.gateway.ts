import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages/messages.service';
import { Message } from 'src/entity/message.entity';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() content: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const user = client.handshake.query.username[0];

      if (!user || !content) {
        client.emit('errorMessage', { message: 'Invalid user or message content' });
        return;
      }

      const message: Message = await this.messagesService.createMessage(user, content);
      
      this.server.emit('newMessage', message);
    } catch (error) {
      console.error('Error while sending message:', error);
      client.emit('errorMessage', { message: 'Error processing message' });
    }
  }
}