export class ApiError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'API request failed',
      data.details
    );
  }
  
  return data;
};