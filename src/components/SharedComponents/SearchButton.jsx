import React from 'react'
import { Input } from 'antd'
import { SearchOutlined} from '@ant-design/icons';
const { Search } = Input;
export default function SearchButton() {
  return (
    <>
         <Input
              className="custom-search"
              placeholder="Search here..."
              prefix={<SearchOutlined style={{ color: '#C0C0C0', fontSize: 20 }} />}
              onPressEnter={(e) => console.log(e.target.value)}
              style={{ width: 300, height: 44 }}
            />
    </>
  )
}
