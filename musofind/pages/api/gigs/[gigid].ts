import type { NextApiRequest, NextApiResponse } from 'next'
import { getGig, deleteGig, updateGig, createGig } from "../../../methods/gigs.js"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const method = req.method

    let result
    switch (method) {
        case "GET":
            result = await getGig(req.query.gigid)
            res.status(200).json(result)
            break

        case "DELETE":
            result = await deleteGig(req.query.gigid)
            res.status(200).json({
                ...result,
                message: `Gig with GigID: ${req.query.gigid} deleted`,
            })
            break

        case "POST":
            
            break
        
        case "PATCH":
            
            break

        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
