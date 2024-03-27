export async function postJson(data: unknown): Promise<{ status: number}> {
  try {
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return { status: response.status};
  } catch (error) {
    console.error('Error adding grid item:', error);
    throw error; // throw to caller
  }
}
