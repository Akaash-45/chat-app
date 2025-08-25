// Frontend: useSignup.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const signup = async (formData) => {
    const success = handleInputErrors(formData);
    if (!success) return;
    
    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullname,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender
      };

      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      //local storage
      localStorage.setItem("chat-user",JSON.stringify(data));

      //context API
      setAuthUser(data);
      
      toast.success('Signup successful!');
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputErrors(formData) {
  const { fullname, username, password, confirmPassword, gender } = formData;
  
  if (!fullname || !username || !password || !gender || !confirmPassword) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password should be at least 6 characters long');
    return false;
  }

  return true;
}

export default useSignup;