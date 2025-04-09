const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function followUserByEmail(targetEmail: string, followerEmail: string): Promise<any> {
  const response = await fetch(
    `${API_URL}/users/${encodeURIComponent(targetEmail)}/follow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerEmail }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error following user with email ${targetEmail}: ${errorText}`);
  }
  return response.json();
}

export async function starUserByEmail(targetEmail: string, starrerEmail: string): Promise<any> {
  const response = await fetch(
    `${API_URL}/users/${encodeURIComponent(targetEmail)}/star`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ starrerEmail }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error starring user with email ${targetEmail}: ${errorText}`);
  }
  return response.json();
}
