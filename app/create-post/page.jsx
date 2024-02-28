"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PostForm from '@components/PostForm'

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false)

  const [post, setPost] = useState({
      body: '',
      title: '',
      mainImage: '',
      category: '',
  })
  
  const handleLoadingImage = async (image) => {
      setLoadingImage(true)

      try {
          const formData = new FormData()
          formData.set('file', image)
          const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
          })
          if (response.ok) {
            const data = await response.json();
            setPost({ ...post, mainImage: data.imageUrl })
          }
      } catch (error) {
          console.log(error)
      } finally {
          setLoadingImage(false)
      }
  }

  const createPost = async (e) => { 
    e.preventDefault();
    setIsSubmitting(true);  

    try {
        const response = await fetch('/api/post/new', {
            method: 'POST',
            body: JSON.stringify({
                body: post.body,
                userId: session?.user.id,
                title: post.title,
                mainImage: post.mainImage,
                category: post.category,
            }),
        })

        if (response.ok) {
            router.push('/')
        }
    } catch (error) {
        console.log(error)
    } finally {
        setIsSubmitting(false)
    }
  };

  return (
      <PostForm
          type='Create'
          post={post}
          setPost={setPost}
          handleLoadingImage={handleLoadingImage}
          submitting={submitting}
          loadingImage={loadingImage}
          handleSubmit={createPost}
      />
  )
};

export default CreatePost
