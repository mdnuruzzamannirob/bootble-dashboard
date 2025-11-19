import React from 'react'
import { Button } from 'antd'
export default function CancelButton({text, onCancel}) {
  return (
    <div>
        <Button onClick={onCancel} style={{ borderColor: '#E4AF00', color: '#E4AF00', width:'210px', height: '48px' , fontFamily:'Inter', fontSize: '16px' }}>
            {text}
          </Button>
    </div>
  )
}
