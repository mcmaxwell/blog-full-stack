import Category from '@models/category'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const category = await Category.findById(params.name).populate('creator')
        if (!category) return new Response('Category Not Found', { status: 404 })

        return new Response(JSON.stringify(category), { status: 200 })
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { name, description } = await request.json()

    try {
        await connectToDB()

        // Find the existing Category by name
        const existingCategory = await Category.findById(params.name)

        if (!existingCategory) {
            return new Response('Post not found', { status: 404 })
        }

        // Update the post with new data
        existingCategory.name = name
        existingCategory.description = description

        await existingCategory.save()

        return new Response('Successfully updated the Categories', {
            status: 200,
        })
    } catch (error) {
        return new Response('Error Updating Category', { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        // Find the Category by name and remove it
        await Category.findByIdAndRemove(params.id)

        return new Response('Category deleted successfully', { status: 200 })
    } catch (error) {
        return new Response('Error deleting category', { status: 500 })
    }
}
