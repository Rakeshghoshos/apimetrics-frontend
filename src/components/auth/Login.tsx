import { Link ,useNavigate } from "react-router-dom";
import { useForm ,SubmitHandler} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "../../core/Store";
import { fetchUserAsync } from "./UserSlice";
import Storage from "../../core/storage";
import lodash from "lodash";
import { FormEvent } from "react";
import { useEffect } from "react";

type FormValues = {
  emailId: string,
  password: string
};

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state)=>state.user.user);
  const onSubmit: SubmitHandler<FormValues> =(data:FormValues) => {
    dispatch(fetchUserAsync(data));
    if(!lodash.isEmpty(user)){
      Storage.setValues({key:'token' ,value:user.data?.token || null});
      Storage.setValues({key:'user',value:JSON.stringify(user.data) || null});
    }
  };
  
  useEffect(() => {
    if(Storage.getValues('token') && Storage.getValues('token') != null && Storage.getValues('user') != null){
      navigate('/dashboard/home');
    }else{
      alert("Invalid Credentials");
    }
  }, [Storage.getValues('token')])
  
  
  const handleFormSubmit = (e:FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };
    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
{/*               <img
                alt="Your Company"
                src="https://images.app.goo.gl/qxMvaTdLSZDAVMFP7"
                className="mx-auto h-10 w-auto"
              /> */}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login to you account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      required
                      {...register('emailId', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.emailId && <p>{errors.emailId.message}</p>}
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      type="password"
                      required
                      {...register('password', { required: 'Password is required' })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                new user?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Signup here to create account
                </Link>
              </p>
            </div>
          </div>
        </>
      )
}
