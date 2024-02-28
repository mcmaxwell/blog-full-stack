import Category from '@models/category'
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const categories = await Category.find({}).populate('name')


        return new Response(JSON.stringify(categories), { status: 200 })
    } catch (error) {
        console.error('Error fetching categories:', error)
        return new Response('Failed to fetch all categories', { status: 500 })
    }
} 