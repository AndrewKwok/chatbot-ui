export const getUserSubFromToken = (sessionUser: any): string | null => {
  try {
    if (!sessionUser || !sessionUser.sub) {
      return null;
    }
    return sessionUser.sub;
  } catch (error) {
    console.error('Error decoding access token:', error);
    return null;
  }
};
