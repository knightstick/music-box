import { search } from "@/lib/spotify";
import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";

const handler: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const query = req.query.q;

  if (!query) {
    res.status(400).json({ message: "Missing query" });
    return;
  }

  const accessToken = token.accessToken;

  if (!accessToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const spotifyResults = await search(query as string, accessToken as string);

  return res.status(200).json(spotifyResults.items);
};

export default handler;
