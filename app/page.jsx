import Posts from '@components/Posts'

const Home = () => (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
            Blog title example
            <br className='max-md:hidden' />
            <span className='orange_gradient text-center'>With gradient</span>
        </h1>
        <p className='desc text-center'>
            orem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
        </p>
        <Posts />
    </section>
)

export default Home;
