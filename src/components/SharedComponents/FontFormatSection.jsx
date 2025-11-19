import React from 'react'
import fontSign from '/images/Help/Font_Size.png'
import formatSign from '/images/Help/format.png'
import sectionSign from '/images/Help/Section.png'
export default function FontFormatSection() {
    return (
        <div className='flex gap-2'>
            <img src={fontSign} alt="" />
            <img src={formatSign} alt="" />
            <img src={sectionSign} alt="" />
        </div>
    )
}
