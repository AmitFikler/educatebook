export interface ServerToClientEvents {
  replayMessage: ({ name, message, room }: Message) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message, room }: Message) => void;
}

export interface Message {
  name: string;
  message: string;
  room: string;
}
