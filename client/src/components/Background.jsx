import React from 'react'

const Background = () => {
    return (
        <h1 className='text-[8vw] leading-none tracking-tighter fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold text-zinc-300 pointer-events-none'>{process.env.REACT_APP_NAME}</h1>
    )
}

export default Background