import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Storage from '../../core/storage';
import { logout } from './UserSlice';
import { useAppDispatch } from '../../core/Store';


const Logout = () => {

    const navigate = useNavigate();
  const dispatch = useAppDispatch();
    useEffect(() => {
      Storage.removeAll();
      dispatch(logout());
      navigate('/'); 
    }, [])
    

  return (
    <div>
        logout
    </div>
  );
};

export default Logout;
