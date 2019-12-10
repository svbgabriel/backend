import { Request, Response } from 'express';
import Box from '../models/Box';

class BoxController {
  store = async (req: Request, res: Response) => {
    const box = await Box.create(req.body);
    return res.json(box);
  };

  show = async (req: Request, res: Response) => {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } },
    });
    return res.json(box);
  };
}

export default new BoxController();
