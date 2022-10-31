import { useState, useEffect, createContext, useReducer, useRef } from 'react';
import { Box, Title, Text, NumberInput, TextInput, Button, Group, Checkbox, Stack, Image, BackgroundImage, Container, LoadingOverlay, Select, Card, Avatar, Badge, SimpleGrid } from '@mantine/core';
import { IconHeart, IconEye } from '@tabler/icons';
import { useIntersection } from '@mantine/hooks';

import Router from 'next/router';
import axios from 'axios';


const PhotosCard = ({ id, user, urls, liked, session }) => {

    const [like, setLiked] = useState(liked);

    const handleLike = async (e, index) => {

        if (e.detail === 2 && index == 2 || e.detail === 1 && index == 1) {
            if (like === true) {
                await axios.get(`http://localhost:3000/photos/dislike/${id}/${session.email}`, { withCredentials: true });
                setLiked(false);
            } else {
                await axios.get(`http://localhost:3000/photos/like/${id}/${session.email}`, { withCredentials: true });
                setLiked(true);
            }

        }
    }





    return (
        <Card onClick={(e) => handleLike(e, 2)} radius="md">
            <Card.Section sx={{ position: 'relative', height: 200 }}>
                <BackgroundImage src={urls.small} sx={{
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                </BackgroundImage>

            </Card.Section>
            <Card.Section>
                <Group mt="md" mb="xs" position='apart' p={1} sx={(theme) => ({
                    color: theme.colors.gray[7],
                })}>
                    <Group spacing={10}>
                        <Avatar alt="image" src={user.profile_image.medium} size={25} radius={100} />
                        <Text size="xs" weight={600}>
                            {user.username}
                        </Text>
                    </Group>
                    <Group spacing={10}>
                        <Group spacing={8}>
                            <IconHeart onClick={(e) => { handleLike(e, 1) }} pointer="cursor" size={20} fill={like ? 'red' : 'white'} strokeWidth={like ? 0 : 1} />
                            <Text size={10} weight={700}>
                                1.2k
                            </Text>
                        </Group>
                        <Group spacing={8}>
                            <IconEye size={20} />
                            <Text size={10} weight={700}>
                                4.2k
                            </Text>
                        </Group>



                    </Group>
                </Group>

            </Card.Section>
        </Card>
    )
}
const Dashboard = ({ session }) => {

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const contrainerRef = useRef();
    const [order, setOrder] = useState('popular');


    const { ref, entry } = useIntersection({
        root: contrainerRef.current,
        threshold: 1
    })

    const loadImages = async () => {
        try {
            await axios.get(`http://localhost:3000/photos?page=${page}`, { withCredentials: true })
                .then((response) => {
                    setImages([...images, ...response.data]);
                    setPage(page + 1);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await axios.get('http://localhost:3000/logout', { withCredentials: true })
                .then((response) => {
                    window.location.href = '/'
                })
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        loadImages();
    }, [])

    useEffect(() => {
        if (entry && entry.isIntersecting && images.length > 0) {
            loadImages();
        }
    }, [entry])


    return (
        <Box ref={contrainerRef} sx={(theme) => ({
            backgroundColor: 'white',
            height: '100vh',
            padding: '40px',
            overflowY: 'scroll'

        })}>    

            <Group sx={{justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center'}}>
            <Text size="xl" weight={700} mb="md" align='center'>
                Welcome {session.email}
            </Text>
            <Button onClick={logout} variant="outline" color="red" size="sm">
                Logout
            </Button>
            </Group>

            <Box mt={40}>
                <SimpleGrid cols={5}   breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}>
                    {images.map((image, index) => (
                            <PhotosCard key={index}  {...image} setImages={setImages} session={session} />
                    ))}
                </SimpleGrid>
                <Box ref={ref} sx={{ position: 'relative', width: '100%', height: 50 }}>
                    {entry && entry.isIntersecting && <LoadingOverlay visible={true} size={20} loaderProps={{ size: 'sm', color: 'blue', variant: 'bars' }} />}
                </Box>

            </Box>



        </Box>
    );
}


export default Dashboard