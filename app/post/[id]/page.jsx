"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Post from "@components/Post";

const UserPost= ({ params }) => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title')

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/post/${params?.id}`)
      const data = await response.json();
      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return <Post {...userPosts} />
};

export default UserPost
