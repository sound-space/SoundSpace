export async function search(q) {
  q = encodeURIComponent(q);
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${q}&type=track`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.props.user.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return await result.json();
}
