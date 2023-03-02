import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error(
    "Spotify client ID and secret must be set as environment variables"
  );
}

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
].join(",");

export const refreshAccessToken = async (prevToken: any) => {
  const { refreshToken } = prevToken;
  const url = `https://accounts.spotify.com/api/token`;
  const data = {
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  const params = new URLSearchParams(data);

  for (const [key, value] of Object.entries(data)) {
    params.set(key, value);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    throw await response.json();
  }

  const json = await response.json();

  const expiresAt = new Date().getTime() + json.expires_in * 1000;

  return {
    ...prevToken,
    accessToken: json.access_token,
    accessTokenExpires: expiresAt,
  };
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account) {
        const { access_token, expires_at, refresh_token } = account;

        if (!access_token || !refresh_token) {
          throw new Error("Missing access token information");
        }

        // TODO: expiry and refresh
        const newToken: {
          accessToken: string;
          refreshToken: string;
          accessTokenExpires?: number;
          user: any;
        } = {
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpires: expires_at,
          user,
        };
        console.log("newToken", newToken);

        return newToken;
      }

      // Subsequent use of JWT, the user has been logged in before, check if the token is still valid
      if (
        token.accessTokenExpires &&
        new Date().getTime() < token.accessTokenExpires
      ) {
        return token;
      }

      // Token might be expired
      const refreshed = await refreshAccessToken(token);
      console.log("refreshed", refreshed);
      return refreshed;
    },

    async session({ session, token }) {
      // Need to safelist the fields you want from the token
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      session.error = token.error as any;

      return session;
    },
  },
});
