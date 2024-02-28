const Post = ({ title, body, categories, mainImage }) => {
  return (
      <>
          <section
              className='w-full bg-center bg-cover'
          >
              <img
                  src={mainImage}
                  alt={title}
              />
              <h1 className='head_text text-left mb-4'>
                  <span className='blue_gradient'>{title}</span>
              </h1>
          </section>
          <section className='w-full'>
              <p className='text-left'>{body}</p>
              {categories &&
                  categories.map((category) => (
                      <p className='categories text-left'>{category}</p>
                  ))}
          </section>
      </>
  )
};

export default Post
