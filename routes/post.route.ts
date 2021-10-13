import express, { Request, Response } from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const file = fs.readFileSync('data.json', 'utf8');
  res.send({ users: JSON.parse(file) });
});

router.post('/', (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An error occured while writing Post.' });
  }
  fs.writeFile('data.json', `${JSON.stringify(req.body)}`, (err) => {
    if (err) {
    }
    res.send({ message: 'Post has been saved.' });
  });
});

router.put('/', (req: Request, res: Response) => {
  fs.writeFile('data.json', `${JSON.stringify(req.body)}`, (err) => {
    if (err) {
      res.status(500).send({ message: 'An error occured while writing JSON Object to File.' });
    }
    res.send({ message: 'JSON file has been updated.' });
  });
});

router.delete('/', (req: Request, res: Response) => {
  fs.unlink('data.json', (err) => {
    if (err) {
      res.status(500).send({ message: 'An error occured while delete File.' });
    }
    res.send({ message: 'JSON file has been deleted.' });
  });
});

export default router;
