import Login from '../components/Login'
import Dashboard from '../components/Dashboard';
import axios from 'axios';
import { useState, useEffect, createContext, useReducer } from 'react';
import { Box, Title, Text, NumberInput, TextInput, Button, Group, Checkbox, Stack, Image, BackgroundImage, Container, LoadingOverlay } from '@mantine/core';
import Router from 'next/router';




const getSession = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/user', { withCredentials: true });
      return data;
    } catch (error) {
      return null;
    }
}


export default function Index() {

  const [session, setSession] = useState(null);


  useEffect(() => {
    getSession().then((data) => {
      setSession(data);
    });
  }, []);

  return (
    <>
      {session ? <Dashboard session={session.user} /> : <Login />}

    </>
  )
 
}