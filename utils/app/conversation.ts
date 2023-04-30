// import { Conversation } from '@/types/chat';
//
// export const updateConversation = (
//   updatedConversation: Conversation,
//   allConversations: Conversation[],
// ) => {
//   const updatedConversations = allConversations.map((c) => {
//     if (c.id === updatedConversation.id) {
//       return updatedConversation;
//     }
//
//     return c;
//   });
//
//   saveConversation(updatedConversation);
//   saveConversations(updatedConversations);
//
//   return {
//     single: updatedConversation,
//     all: updatedConversations,
//   };
// };
//
// export const saveConversation = (conversation: Conversation) => {
//   localStorage.setItem('selectedConversation', JSON.stringify(conversation));
// };
//
// export const saveConversations = (conversations: Conversation[]) => {
//   localStorage.setItem('conversationHistory', JSON.stringify(conversations));
// };

//below new function to write to mongodb

import { Conversation } from '@/types/chat';

export const updateConversation = async (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  await saveConversation(updatedConversation);
  await saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = async (conversation: Conversation) => {
  try {
    const response = await fetch('/api/mongodb/saveSingleConversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation }),
    });

    if (!response.ok) {
      throw new Error('Failed to save conversation');
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
};

export const saveConversations = async (conversations: Conversation[]) => {
  try {
    const response = await fetch('/api/mongodb/saveConversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversations }),
    });

    if (!response.ok) {
      throw new Error('Failed to save conversations');
    }
  } catch (error) {
    console.error('Error saving conversations:', error);
  }
};
