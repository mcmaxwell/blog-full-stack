import React, { useState, useEffect, useRef } from 'react'

function CategorySelector({ post, setPost }) {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState('')
    const [submitting, setIsSubmitting] = useState(false)
    const [selectedCategories, setSelectedCategories] =
        useState(['Uncategorized'])
    const refInput = useRef(null)

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/category')
            if (response.ok) {
                const data = await response.json()
                setCategories(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

      const createCategory = async (e) => {
          e.preventDefault()
          setIsSubmitting(true)
          refInput.current.validity.valid // need to check

          try {
              const response = await fetch('/api/category/new', {
                  method: 'POST',
                  body: JSON.stringify({
                      name: newCategory,
                      description: '',
                  }),
              })
              if (response.ok) {

                  const newCat = await response.json()
    
                  setCategories((prev) => [...prev, newCat])
              }
          } catch (error) {
              console.log(error)
          } finally {
              setIsSubmitting(false)
          }
      }

    useEffect(() => {   
        post.categories
            ? setSelectedCategories(post.categories)
            : fetchCategories()
    }, [])

    useEffect(() => {
        setPost({ ...post, category: selectedCategories })
        console.log(categories);
    }, [selectedCategories])

    const handleCategoryAdd = (e, categorySelected) => {
        e.preventDefault()

        setSelectedCategories((prev) => [...prev, categorySelected])
        setCategories(prev => 
             (prev.map((cat) => {
                if (cat.name === categorySelected) {
                    return ({...cat, selected:true})
                } else {
                    return cat
                }
            }))
        )

        if (categorySelected === 'newCategory') {
            setPost({ ...post, category: newCategory })
        }
    }

    const handleCategoryRemove = async (e, id) => {
        e.preventDefault()
        const hasConfirmed = confirm(
            'Are you sure you want to delete this category?'
        )

        if (hasConfirmed) {
            try {
                await fetch(`/api/category/${id}`, {
                    method: 'DELETE',
                })

                setCategories((prev) =>
                    prev.filter((cat) => {
                        if (cat._id !== id) {
                            return cat
                        }
                    })
                )
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <div>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
                Field of Categories
            </span>
            <div className='flex-start flex-wrap'>
                {categories &&
                    categories.map((category) => (
                        <button
                            className={`mx-1 my-1 ${
                                category.selected ? 'outline_btn' : 'black_btn'
                            }`}
                            key={category._id}
                            onClick={(e) => handleCategoryAdd(e, category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
            </div>

            <div>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Create new Category
                </span>
                <input
                    value={newCategory}
                    onChange={(e) => {
                        setNewCategory(e.target.value)
                    }}
                    type='text'
                    placeholder='New Category Name'
                    required
                    ref={refInput}
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
            </div>
            <div>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Remove category
                </span>
                <div className='flex-start flex-wrap'>
                    {categories &&
                        categories.map((category) => (
                            <button
                                className={`mx-1 my-1 ${
                                    category.selected
                                        ? 'outline_btn'
                                        : 'black_btn'
                                }`}
                                key={category._id}
                                onClick={(e) =>
                                    handleCategoryRemove(e, category._id)
                                }
                            >
                                {category.name}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default CategorySelector
