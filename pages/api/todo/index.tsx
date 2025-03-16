import { NextApiRequest, NextApiResponse } from 'next';
import {getAllData} from "@/services/serviceOperations";
import allowCors from '../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

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
export default allowCors(handler);