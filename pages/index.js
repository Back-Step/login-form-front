import { useRouter } from 'next/router';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = ({ username, password, remember }) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/',
      data: {
        username,
        password,
        remember,
      },
    });
    setUser({ name: username });
  };

  const router = useRouter();

  const userInit = () => {
    useRouter;
    router.push('/');
    setUser();
  };

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="hello-user">Submit {user.name}!</h1>
          <button onClick={() => userInit()}>Return Login form</button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <h3 className="form-header">LOGIN</h3>
          </div>
          <div className="row">
            <input
              type="text"
              placeholder="user name"
              {...register('username', {
                required: { value: true, message: 'User name is required' },
                minLength: {
                  value: 3,
                  message: 'User name cannot be less than 3 character',
                },
              })}
              className={'form-field' + (errors.username ? ' has-error' : '')}
            />
            {errors.username && (
              <span className="error-label">{errors.username.message}</span>
            )}
          </div>
          <div className="row">
            <input
              type="password"
              placeholder="password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Please enter your password',
                },
              })}
              className={'form-field' + (errors.password ? ' has-error' : '')}
            />
            {errors.password && (
              <span className="error-label">{errors.password.message}</span>
            )}
          </div>
          <div className="row row-remember">
            <input type="checkbox" id="remember" {...register('remember')} />
            <label htmlFor="remember" className="remember-label">
              Remember me
            </label>
          </div>
          <div className="row">
            <button type="submit" className="btn login-btn">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Home;
