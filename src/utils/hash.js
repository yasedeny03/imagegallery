import md5File from 'md5-file';

export const calculateHash = async (filePath) => {
  try {
    return await md5File(filePath);
  } catch (error) {
    throw new Error('Error calculating file hash');
  }
};