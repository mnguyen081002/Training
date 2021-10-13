interface IPostResponse {
  id: number;
  title: string;
  body: string;
  user: {
    id: number;
    username: string;
  };
  created_at: Date;
  updated_at: Date;
}
export { IPostResponse };
