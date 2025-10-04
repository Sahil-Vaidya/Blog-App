import React from 'react'

//container accept property as a children
function Container({children}) {
    return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container
