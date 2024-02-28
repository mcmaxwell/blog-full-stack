import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
})

const Category = models.Category || model('Category', CategorySchema)

export default Category
