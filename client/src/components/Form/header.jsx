import React from 'react'

const header = ({ title, subtitle }) => {
    return (
        <>
            <h1 className='text-center text-3xl font-bold'>{title}</h1>
            <p className="text-center mt-3 font-medium text-gray-500 text-md leading-6">{subtitle}</p>
        </>
    )
}

export default header