import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { connectToDatabase } from '../../../utils/app/mongoClient';
import { getUserSubFromToken } from '../../../utils/app/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req, res);
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userSub = getUserSubFromToken(session.user);
    if (!userSub) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    console.log(userSub);

    const { client } = await connectToDatabase();

    const userData = await client.db('Chatbot').collection('userData').findOne({'userSub': userSub
    });
    console.log(userData);

    if (!userData) {
      return res.status(404).json({ message: 'User data not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
}
