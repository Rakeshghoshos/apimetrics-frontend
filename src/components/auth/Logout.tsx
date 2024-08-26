import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Storage from '../../core/storage';


const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      Storage.removeAll();
      navigate('/'); 
    }, [])
    

  return (
    <div>
        logout
    </div>
  );
};

export default Logout;
