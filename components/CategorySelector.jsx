import React, { useState, useEffect } from 'react'

function CategorySelector({ post, setPost }) {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState('')
    const [submitting, setIsSubmitting] = useState(false)

    const fetchCategories = async () => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/category')
                console.log(response)

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setCategories(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

      const createCategory = async (e) => {
          e.preventDefault()
          setIsSubmitting(true)

          try {
              const response = await fetch('/api/category/new', {
                  method: 'POST',
                  body: JSON.stringify({
                      name: newCategory,
                      description: '',
                  }),
              })
              if (response.ok) {

                  const data = await response.json()
                    console.log(data)
                  setCategories([newCategory])
              }
          } catch (error) {
              console.log(error)
          } finally {
              setIsSubmitting(false)
          }
      }

    useEffect(() => {   
        post.category ? setCategories(post.category) : fetchCategories()
        console.log(post)
    }, [])

    const handleCategoryChange = (e) => {
        const value = e.target.value
        if (value === 'newCategory') {
            // If "Create new..." is selected, use the newCategory state
            setPost({ ...post, category: newCategory })
        } else {
            setPost({ ...post, category: value })
        }
    }

    return (
        <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
                Field of Categories
            </span>
            <select
                onChange={handleCategoryChange}
                value={categories[0]}
                className='form_select block border-2 focus:ring-2 focus:ring-inset focus:primary-orange sm:text-sm sm:leading-6'
                required
            >
                {categories.map((category) => (
                    <option
                        key={category._id}
                        value={category.name}
                    >
                        {category.name}
                    </option>
                ))}
                <option value='newCategory'>Create new...</option>
            </select>   
            {'Admin' === false && (
                <>
                    <input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        type='text'
                        placeholder='New Category Name'
                        required
                        className='form_input block border-2 mt-2 focus:ring-2 focus:ring-inset focus:primary-orange sm:text-sm sm:leading-6'
                    />

                    <button
                        type='button'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                        onClick={(e) => createCategory(e)}
                    >
                        {submitting ? `Sending...` : 'Send'}
                    </button>
                </>
            )}
        </label>
    )
}

export default CategorySelector
