import db from '../config/db';

class Post {
  title: string;
  body: string;
  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }

  save() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1;
    const dd = d.getDate();

    const createAt = `${yyyy}-${mm}-${dd}`;

    const sql = `INSERT INTO posts(title, body, created_at) VALUES (?,?,?)`;

    return db.execute(sql, (this.title, this.body, createAt));
  }
}

export default Post;
