"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Post from '@components/Post'

const MyPost = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/post/${session?.user.id}`)
            const data = await response.json()

            setMyPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            'Are you sure you want to delete this post?'
        )

        if (hasConfirmed) {
            try {
                await fetch(`/api/post/${post._id.toString()}`, {
                    method: 'DELETE',
                })

                const filteredPosts = myPosts.filter(
                    (item) => item._id !== post._id
                )

                setMyPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Post
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional posts and inspire others with the power of your imagination'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyPost
