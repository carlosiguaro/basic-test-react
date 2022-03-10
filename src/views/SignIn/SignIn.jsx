import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    var url = 'https://uniontracking-3.frogi.dev/api/login';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(authData), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      const res = response;
      if (res?.status && res.status ) {

        if (res.status){
          console.log(res)
          
          localStorage.setItem('access', JSON.stringify({
            name: res.data.user.name,
            token: res.data.token
          }));

          history.push("/create-member");
          return;
        }
      }
      setLoading(false);
      setAuth(false);
    });
  };

  const updateData = (e) => {
    let prop = {};
    const currentData = e.target,
      name = currentData.name,
      value = currentData.value;
    prop[name] = value;
    if (!auth) setAuth(true);

    setAuthData({
      ...authData,
      ...prop
    });
  };

  const TextButton = () => loading ?
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div> :
    'Enter';

  return (
    <div className="signin container vh-100 d-flex justify-content-center align-items-center">
      <div className="card border-dark p-3" style={{'min-width': '400px'}}>

        <div className="card-header">
          <h6 className='text-bold'>Sign in</h6>
        </div>

        <form onSubmit={submit} className='mt-2'>
          <div className="form-floating mb-3">
            <input 
              type="email" 
              name="email"
              className="form-control" 
              placeholder="name@example.com"
              value={authData.email}
              onChange={updateData}
              required
            />
            <label>Email address</label>
          </div>

          <div className="form-floating">
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              placeholder="Password"
              value={authData.password}
              onChange={updateData}
              required
            />
            <label>Password</label>
          </div>

          {
            !auth &&
            <div className="alert alert-danger pl-5 pr-3 my-3" role="alert">
              Usuario o contrasena incorrecto
            </div>
          }

          <div className="d-grid gap-1 mt-3">
            <button className="btn btn-dark" type="submit">
              <TextButton />
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default SignIn;
