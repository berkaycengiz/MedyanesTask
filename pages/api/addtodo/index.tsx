import { NextApiRequest, NextApiResponse } from 'next';
import {createNewData} from "@/services/serviceOperations";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if(req.method === 'POST'){
        try {

            const body = await req.body;
            if(!body){
                throw new Error("Bir hata olustu!");
            }

            const data = await createNewData ("listElements", body);

            if(!data || data.error){
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

}

export default handler;