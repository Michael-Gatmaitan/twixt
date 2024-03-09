const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUser(userID: string) {
  const req = await fetch(`${apiUrl}/user?userID=${userID}`);
  const res = await req.json();

  return res;
}
