export default function useGithubGetCode() {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const scope = 'user:email read:user';

  const githubGetCode = () => {
    const params = {
      client_id,
      scope,
    };

    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const authUrl = `https://github.com/login/oauth/authorize?${queryString}`;

    window.location.assign(authUrl);
  };

  return {
    githubGetCode
  };
}
