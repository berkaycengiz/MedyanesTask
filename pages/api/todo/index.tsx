import { NextApiRequest, NextApiResponse } from 'next';
import {getAllData} from "@/services/serviceOperations";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if(req.method === 'GET'){
        try {
            const data = await getAllData("listElements");
            
            if(!data || data.error || data === undefined){
                throw new Error(data.error);
            }
            return res.status(200).json({status: "success", data: data});
        } 
        catch (error) {
            return res.status(500).json({status: "error", error: (error as Error).message, data: null}); 
        }
    }
}
export default handler;