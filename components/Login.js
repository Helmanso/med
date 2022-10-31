import { Box, Title, Text, NumberInput, TextInput, Button, Group, Checkbox, Stack, Image, BackgroundImage, Container, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandGoogle } from '@tabler/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

const Login = () => {


    const [result, setResult] = useState(null);
    const [visible, setVisible] = useState(false);
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,

        },
        validate: {
            email: (value) => (value.length < 4 ? 'email must have at least 4 letters' : null),
            password: (value) => (value.length < 4 ? 'email must have at least 4 letters' : null),
        },
    });

    useEffect(() => {
        if (result && result.success === true)
            window.location.href = '/'
    }, [result]);


    const login = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values, { withCredentials: true });
            setResult(response.data);
            setVisible(false);
        } catch (error) {
            console.log(error);
            setResult(error.response.data);
            setVisible(false);

        }
    }



    const submit = async (values) => {
        setVisible(true);
        const timer = setTimeout(() => {
          login(values);
        }, 500);
        return () => clearTimeout(timer);
    }


    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: theme.colors.gray[1],
                padding: theme.spacing.md,

            })}
        >

            <Box
                sx={(theme) => ({
                    display: 'flex',
                    backgroundColor: 'white',
                    borderRadius: theme.radius.md,
                    boxShadow: theme.shadows.sm,
                    width: '100%',
                    height: 600,
                    maxWidth: 1000,
                    overflow: 'hidden',
                    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                        flexDirection: 'column',
                    },

                })}
            >

                <Box sx={(theme) => ({
                    maxWidth: '50%', flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                        maxWidth: '100%',
                        flexBasis: '100%',
                    },

                })}>
                        <Box sx={(theme) => ({ width: '70%' })}>
                            <LoadingOverlay visible={visible} overlayBlur={2}  loaderProps={{ size: 'md', color: 'gray' }} />
                            <Title order={1} weight={600}>Welcome Back</Title>
                            <Text color="gray" size="sm" mt={5} mb={20}>Welcome Back! Please enter your details.</Text>
                            <form onSubmit={form.onSubmit(submit)}>
                                <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                                <TextInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
                                <Group mt={20} spacing={15}>
                                    <Checkbox
                                        size='xs'

                                        label="Remember me for 30 days"
                                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                                    />
                                    <Text size="xs" weight={600}>Forgot Password !</Text>
                                </Group>
                                {result && result.success === false && <Text color="red" size="xs" mt={5} mb={20}>{result.message}</Text>}
                                <Stack mt={20}>
                                    <Button
                                        type="submit"
                                        color="dark"
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="gray"
                                        variant='outline'
                                        leftIcon={<IconBrandGoogle />}
                                    >
                                        <Text color="dark">
                                            Sign In with Google
                                        </Text>
                                    </Button>
                                    <Text align='center' size="xs" color="gray" component="span">You Dont have an account?<Text ml={5} size="xs" color="dark" weight={700} component="a">Sign up for free</Text></Text>
                                </Stack>
                            </form>
                        </Box>

                </Box>
                <Box sx={(theme) => ({
                    width: '50%', height: '100%',
                    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                        display: 'none',
                    },

                })
                }>
                    <BackgroundImage
                        src="./ceo.png"
                        alt="CEO"
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'right',

                        }}
                    />
                </Box>


            </Box>
        </Box>
    )
}

export default Login
