import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, LessProminentRow } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import GitHubLoginButton from '../../components/Form/GitHubLoginButton';

import useGithubSignIn from '../../hooks/api/useGithubSignIn';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  

  const { githubSignInLoading, githubSignIn } = useGithubSignIn();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      githubSignIn(code)
        .then((res) => {
          setUserData(res);
          console.log(res)
          console.log(res);
          toast('Login realizado com sucesso!');
          navigate('/dashboard');
        })

    }
  }, [])
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      console.log(userData);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  } 


  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
      <Row>
      <LessProminentRow>
       ou
      </LessProminentRow>
      </Row>
      <Row>
      <GitHubLoginButton disabled={loadingSignIn || githubSignInLoading}/>
      </Row>
    </AuthLayout>
  );
}
