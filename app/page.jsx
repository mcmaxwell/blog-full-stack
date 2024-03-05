import Posts from '@components/Posts'

const Home = () => (
    <section className='w-full flex-center flex-col'>
        <div className='w-full'>
            <h1 className='head_text'>
                Blog title example
                <br className='max-md:hidden' />
                <span className='orange_gradient'>
                    With gradient
                </span>
            </h1>
            <p className='desc'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries
            </p>
        </div>

        <Posts />
    </section>
)

export default Home;
