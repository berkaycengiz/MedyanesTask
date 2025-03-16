import { NextApiRequest, NextApiResponse } from 'next';
import { updateDataByAny } from "@/services/serviceOperations";
import allowCors from '../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const content  = req.body;

      if (!content) {
        throw new Error("Icerik eksik!");
      }

      if (!id) {
        throw new Error("ID eksik!");
      }

      const data = await updateDataByAny("listElements", id as string, content);

      if (!data || data.error) {
        throw new Error(data.error);
      }

      return res.status(200).json({status: "success", message: "Basarili!"});

    } catch (error) {
        return res.status(500).json({status: "error", error: (error as Error).message}); 
    }
  } 
  else{
    return res.status(500).json({status: "error", error: "Bir hata oluştu!"});
  }
};

export default allowCors(handler);
