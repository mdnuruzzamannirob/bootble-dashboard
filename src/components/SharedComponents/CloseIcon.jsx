import React from 'react'
import { CloseOutlined } from '@ant-design/icons';

export default function CloseIcon({onClick}) {

  return (
    <div>
        <CloseOutlined
                  onClick={onClick}
                  style={{ color: '#E4AF00', width:'16px', height:'16px' }} 
                  className="cursor-pointer"
                />
    </div>
  )
}
