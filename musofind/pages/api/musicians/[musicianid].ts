import type { NextApiRequest, NextApiResponse } from "next"
import {
    getMusician,
    createMusician,
    updateMusician,
    deleteMusicianById,
} from "../../../methods/musicians.js"

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
            result = await getMusician(req.query.musicianid)
            res.status(200).json(result)
            break

        case "DELETE":
            result = await deleteMusicianById(req.query.musicianid)
            res.status(200).json({
                ...result,
                message: `Musician with MusicianID: ${req.query.musicianid} deleted`,
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
