import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error(
    "Spotify client ID and secret must be set as environment variables"
  );
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account) {
        console.log(account);

        const { access_token, expires_in, refresh_token } = account;

        if (!access_token || !refresh_token) {
          throw new Error("Missing access token information");
        }

        // TODO: expiry and refresh
        return {
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpires: Date.now() + (expires_in as number) * 1000,
          user,
        };
      }

      return token;
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
