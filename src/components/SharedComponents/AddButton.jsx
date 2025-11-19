import React from 'react';
import { Button } from 'antd';
export default function AddButton({text, handleSubmit}) {
  return (
    <div>
        <Button
            type="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: '#E4AF00', borderColor: '#E4AF00', fontFamily:'Inter', fontSize: '16px', width:'210px', height: '48px' }}
          >
           {text}
          </Button>
    </div>
  )
}
