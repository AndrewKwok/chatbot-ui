import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { connectToDatabase } from '../../../utils/app/mongoClient';
import { getUserSubFromToken } from '../../../utils/app/auth';

export default async function saveSingleConversation(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const session = await getSession(req, res);

  if (!session || !session.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const userSub = getUserSubFromToken(session.user);

  if (!userSub) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { db } = await connectToDatabase();
  const { conversation } = req.body;

  try {
    await db.collection('userData').updateOne(
      { userSub, 'conversations.id': conversation.id },
      { $set: { 'conversations.$': conversation } },
      { upsert: true }
    );
    res.status(200).json({ message: 'Conversation saved successfully' });
  } catch (error) {
    console.error('Error saving conversation:', error);
    res.status(500).json({ error: 'Error saving conversation' });
  }
}