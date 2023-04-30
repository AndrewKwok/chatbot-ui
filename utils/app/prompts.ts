import { Prompt } from '@/types/prompt';

export const updatePrompt = (updatedPrompt: Prompt, allPrompts: Prompt[]) => {
  const updatedPrompts = allPrompts.map((c) => {
    if (c.id === updatedPrompt.id) {
      return updatedPrompt;
    }

    return c;
  });

  savePrompts(updatedPrompts);

  return {
    single: updatedPrompt,
    all: updatedPrompts,
  };
};

// export const savePrompts = (prompts: Prompt[]) => {
//   localStorage.setItem('prompts', JSON.stringify(prompts));
// };



export const savePrompts = async (prompts: Prompt[]) => {
  try {
    const response = await fetch('/api/mongodb/savePrompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompts }),
    });

    if (!response.ok) {
      throw new Error('Failed to save folders');
    }
  } catch (error) {
    console.error('Error saving folders:', error);
  }
};