export default interface Message {
  id: string;
  email: string;
  photoURL: string;
  displayName: string;
  authorId: string;
  eventId: string;
  message: string;
  to: string;
  done: boolean;
  createdAt: Date;
  anonymous: boolean;
}
