export async function search(query) {
  query = encodeURIComponent(query);
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
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
