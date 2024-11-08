import { useState } from 'react'
const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    // Form Submission Handler Function
    const OnSubmitHandler = async (e) => {
        e.preventdefault();

    }

}

return (
    <form 
        onSubmit={onSubmitHandler} 
        className='flex flex-col items-center w-[85%] sm:max-w-lg m-auto mt-16 gap-6 text-blue-900'
    >
        <div className='inline-flex items-center gap-3 mb-4 mt-6'>
            <p className='font-sans text-4xl font-bold'>{currentState}</p>
            <hr className='border-none h-[2px] w-10 bg-blue-900' />
        </div>

        {currentState === 'Login' ? null : (
            <input 
                className='w-full px-5 py-3 border border-blue-700 rounded-lg text-lg' 
                type="text" 
                placeholder='Full Name' 
                required 
            />
        )}
        
        <input 
            className='w-full px-5 py-3 border border-blue-700 rounded-lg text-lg' 
            type="email" 
            placeholder='Email Address' 
            required 
        />
        
        <input 
            className='w-full px-5 py-3 border border-blue-700 rounded-lg text-lg' 
            type="password" 
            placeholder='Password' 
            required 
        />

        <div className='w-full flex justify-between text-sm mt-[-4px] text-blue-600'>
            <p className='cursor-pointer hover:text-blue-400'>Forgot password?</p>
            {currentState === 'Login' ? (
                <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-blue-400'>Create an account</p>
            ) : (
                <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-blue-400'>Already have an account?</p>
            )}
        </div>

        <button 
            type='submit' 
            className='bg-blue-900 text-white font-medium px-12 py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300'
        >
            {currentState === 'Login' ? 'Sign in' : 'Sign up'}
        </button>
    </form>
);
};

export default Login