import axios from "axios";
import { toast } from "react-toastify";

async function redirectToGithubAuthorization() {
  const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
  const params = {
    response_type: "code",
    scope: "user public_repo",
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: "http://localhost:5173/enroll",
    state: "test-t5",
  };

  const queryStrings = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;

  window.location.href = authorizationUrl;
}

async function handleGithubCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
   
      const response = await axios.post(`http://localhost:5000/login`, {
        code,
      });
      const user = response.data;
      console.log(user);
      toast("Você está logado!");
   
  } else{
    console.log("nada")
  }
}

export { redirectToGithubAuthorization, handleGithubCallback };
