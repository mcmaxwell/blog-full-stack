import Link from "next/link";
import CategorySelector from './CategorySelector';

const PostForm = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit,
    handleLoadingImage,
    loadingImage
}) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Post</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Post title
                    </span>

                    <input
                        value={post.title}
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                        placeholder='Write your post title here'
                        required
                        className='form_input block border-2 focus:ring-2 focus:ring-inset focus:primary-orange sm:text-sm sm:leading-6'
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Post main image
                    </span>
                    {post.mainImage && <img src={post.mainImage} />}
                    {!loadingImage ? (
                        <input
                            type='file'
                            onChange={(e) =>
                                handleLoadingImage(e.target.files?.[0])
                            }
                            className='form_input block border-2 focus:ring-2 focus:ring-inset focus:primary-orange sm:text-sm sm:leading-6'
                        />
                    ) : (
                        <div id='loadingAnimation'>
                            <div className='loader'></div>
                        </div>
                    )}
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Post
                    </span>

                    <textarea
                        value={post.body}
                        onChange={(e) =>
                            setPost({ ...post, body: e.target.value })
                        }
                        placeholder='Write your post here'
                        required
                        className='form_textarea block border-2 focus:ring-2 focus:ring-inset focus:primary-orange sm:text-sm sm:leading-6'
                    />
                </label>

                <CategorySelector
                    post={post}
                    setPost={setPost}
                />

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link
                        href='/'
                        className='text-gray-500 text-sm'
                    >
                        Cancel
                    </Link>

                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                    >
                        {submitting ? `${type}ing...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PostForm
