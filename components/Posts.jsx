"use client";

import { useState, useEffect } from "react";

import PostCard from './PostCard'

const PostsCardList = ({ data }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
    ) 
}

const Posts = () => {
    const [allPosts, setAllPosts] = useState([])

  const fetchPosts = async () => {
    try {
       const response = await fetch('/api/post')
        const data = await response.json()

        setAllPosts(data) 
    } catch (error) {
      console.log(error);
      }
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <section className='feed'>
            <PostsCardList
                data={allPosts}
            />
        </section>
    )
}

export default Posts
