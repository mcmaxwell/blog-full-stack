import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define the filename path within the public directory
    const filename = file.name
    const publicPath = `./public/assets/images/${filename}`

    // Save the file to the filesystem
    await writeFile(publicPath, buffer)

    // Construct the URL path relative to the base URL of your Next.js application
    const imageUrl = `/assets/images/${filename}`

    // Return the success status and the image URL
    return NextResponse.json({ success: true, imageUrl: imageUrl })
}
