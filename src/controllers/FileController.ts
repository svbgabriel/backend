import { Response } from 'express';
import Box from '../models/Box';
import File from '../models/File';

class FileController {
  store = async (req: any, res: Response) => {
    const box = await Box.findById(req.params.id);

    if (!box) {
      return res.status(401).json({ error: { message: 'Box was not found' } });
    }

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.filename,
    });

    box.files.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit('file', file);

    return res.json(file);
  };
}

export default new FileController();
