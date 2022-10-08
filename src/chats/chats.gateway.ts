import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.id);
    console.log(userName);
    socket.emit('hello_user', 'hello ' + userName);
  }
}
