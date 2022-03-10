import { React, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "/public/image2vector.svg"
const CreateMember = () => {
    const history = useHistory();
    const confirmPass = useRef();

    const blankData = {
        name: '',
        email: '',
        password: '',
        c_password: ''
    };

    const [data, setdata] = useState(blankData);
    const [dataAuth, setDataAuth] = useState({
        name: '',
        token: ''
    });

    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(true);
    const [msgregister, setMsgregister] = useState(true);
    

    useEffect(() => {
        console.log('ini');
        const getDataLS = localStorage.getItem('access');
        const dataLS = JSON.parse(getDataLS);
        
        setDataAuth({
            name: dataLS.name,
            token:dataLS.token 
        });
    }, []);


    const closeSession = () => {
        localStorage.removeItem('access');
        history.push('/');
    };

    const createMember = (e) => {
        e.preventDefault();

        if (!validPassword()) return false;

        setLoading(true);
        setRegister(true);
        const url = 'https://uniontracking-3.frogi.dev/api/register';
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${dataAuth.token}`
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            setLoading(false);
            const res = response;
            if (res?.status && res.status) {
                console.log("no?")
                setdata({
                    ...data,
                    ...blankData
                });
            }
            
            setRegister(false);
            setMsgregister(res.message);
            
        });
    };

    const updateData = (e) => {
        let prop = {};
        const currentData = e.target,
          name = currentData.name,
          value = currentData.value;
        prop[name] = value;
        if (!register) setRegister(true);
        
        setdata({
          ...data,
          ...prop
        });
    };

    const validPassword = () => {
        if (data.password !== data.c_password) {
            setRegister(false);
            setMsgregister('Password confirmation does not match');
            return false;
        }
        return true;          
    };

    const TextButton = () => loading ?
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div> :
    'Create';

    return (
       <div className='vh-100'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 py-4">
                <div className="container-fluid">
                    <label className="navbar-brand">Members App</label>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        
                        <span className="navbar-text">
                            Welcome <b>{dataAuth.name}</b> | <button onClick={closeSession} className='btn btn-outline-secondary'>logout</button>
                        </span>
                    </div>
                </div>
            </nav>
            <div className='container-fluid mt-3'>

                <h3>Create Member</h3>

                <form onSubmit={createMember}>
                    <div className="row g-2 my-2">
                        <div className="col-md">
                            <div className="form-floating">
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                name="name"
                                value={data.name}
                                onChange={updateData}
                            />
                            
                            <label>Name</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                            <input 
                                type="email" 
                                className="form-control" 
                                required 
                                name="email"
                                value={data.email}
                                onChange={updateData}
                            />
                            
                            <label>Email address</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row g-2 my-2">
                        <div className="col-md">
                            <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                required 
                                name="password"
                                value={data.password}
                                onChange={updateData}
                            />
                            
                            <label>Password</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                required 
                                name="c_password"
                                value={data.c_password}
                                onChange={updateData}
                                ref={confirmPass}
                            />
                            
                            <label>Confimr Password</label>
                            </div>
                        </div>
                    </div>

                    {
                        !register &&
                        <div className="alert alert-secondary pl-5 pr-3 my-3" role="alert">
                            {msgregister}
                        </div>
                      }


                    <div className="d-grid gap-1 mt-4">
                        <button className="btn btn-dark" type="submit">
                            <TextButton />
                        </button>
                    </div>

                </form>

            </div>
       </div>
    )
};
export default CreateMember;