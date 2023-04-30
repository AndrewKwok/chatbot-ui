import { FolderInterface } from '@/types/folder';
//
// export const saveFolders = (folders: FolderInterface[]) => {
//   localStorage.setItem('folders', JSON.stringify(folders));
// };


export const saveFolders = async (folders: FolderInterface[]) => {
  try {
    const response = await fetch('/api/mongodb/saveFolders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folders }),
    });

    if (!response.ok) {
      throw new Error('Failed to save folders');
    }
  } catch (error) {
    console.error('Error saving folders:', error);
  }
};
