export default function useGithubGetCode() {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  console.log(client_id);
  console.log(redirect_uri);

  const githubGetCode = () => {
    const params = {
      response_type: "code",
      scope: "user public_repo",
      client_id: client_id,
      redirect_uri: redirect_uri,
      state: "test-t5",
    };

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const authUrl = `https://github.com/login/oauth/authorize?${queryString}`;

    window.location.assign(authUrl);
  };

  return {
    githubGetCode
  };
}
