"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';

const PostCard = ({ post, handleEdit, handleDelete }) => {
    const { data: session } = useSession()
    const pathName = usePathname()
    const router = useRouter()

    const [copied, setCopied] = useState('')

    const handleProfileClick = () => {
        if (post.creator._id === session?.user.id)
            return router.push('/profile')

        router.push(
            `/profile/${post.creator._id}?name=${post.creator.username}`
        )
    }

    return (
        <div className='prompt_card'>
            <div className='mb-4 font-satoshi text-sm text-gray-700'>
                <img
                    src={post.mainImage}
                    alt={post.title}
                />
            </div>
            <h1 className='mb-4 font-satoshi text-xl font-bold text-gray-700'>
                <Link href={`/post/${post._id}`}>{post.title}</Link>
            </h1>
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    onClick={handleProfileClick}
                >
                    {post.creator?.image && (
                        <Image
                            src={post.creator.image}
                            alt='user_image'
                            width={40}
                            height={40}
                            className='rounded-full object-contain'
                        />
                    )}

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {post.creator?.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {post.creator?.email}
                        </p>
                    </div>
                </div>
            </div>
            {/* <p className='my-4 font-satoshi text-sm text-gray-700'>
                {post.body}
            </p> */}
            <p className='font-inter text-sm blue_gradient cursor-pointer'>
                {post.category}
            </p>

            {session?.user.id === post.creator?._id &&
                pathName === '/profile' && (
                    <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                        <p
                            className='font-inter text-sm green_gradient cursor-pointer'
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p
                            className='font-inter text-sm orange_gradient cursor-pointer'
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
        </div>
    )
}

export default PostCard
