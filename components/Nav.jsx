'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        ;(async () => {
            const res = await getProviders()
            setProviders(res)
        })()
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link
                href='/'
                className='flex gap-2 flex-center'
            >
                <Image
                    src='/assets/images/logo.svg'
                    alt='logo'
                    width={50}
                    height={50}
                    className='object-contain'
                />
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                <Link
                    href='/about'
                    className='black_btn mr-5'
                >
                    About Us
                </Link>
                {session?.user ? (
                    <div className='flex align-middle gap-4 md:gap-5'>
                        <Link
                            href='/create-post'
                            className='w-full black_btn whitespace-nowrap'
                            onClick={() => setToggleDropdown(false)}
                        >
                            Create Post
                        </Link>

                        <button
                            type='button'
                            onClick={signOut}
                            className='outline_btn whitespace-nowrap'
                        >
                            Sign Out
                        </button>

                        <Link
                            href='/profile'
                            className='w-full'
                        >
                            <Image
                                src={session?.user.image}
                                width={50}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id)
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <Link
                                    href='/create-post'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Post
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id)
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
