import Post from '@models/post'
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, body, title, mainImage, category, comment } =
        await request.json()

    try {
        await connectToDB();
        const newPost = new Post({
            creator: userId,
            body,
            title,
            mainImage,
            categories: category,
            comments: comment,
        })
        await newPost.save()
        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
         console.error('Error creating new post:', error)
        return new Response("Failed to create a new post", { status: 500 });
    }
}
