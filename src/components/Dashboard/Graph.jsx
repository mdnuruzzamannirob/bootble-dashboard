import React from 'react'
import { Card, Select } from 'antd';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    
} from 'recharts';

const { Option } = Select;

const data = [
    { month: 'Jan', income: 80 },
    { month: 'Feb', income: 70 },
    { month: 'Mar', income: 100 },
    { month: 'Apr', income: 75 },
    { month: 'May', income: 90 },
    { month: 'Jun', income: 85 },
    { month: 'July', income: 65 },
    { month: 'Augt', income: 70 },
    { month: 'Sept', income: 90 },
    { month: 'Oct', income: 95 },
    { month: 'Nov', income: 80 },
    { month: 'Dec', income: 98 }
];
export default function Graph() {
  return (
    <div>
         <Card
                        title={<span className="text-[20px] font-semibold font-[Inter] ml-8">Subscription Growth</span>}
                        extra={
                            <Select defaultValue="2025" style={{ width: 100 }}>
                                <Option value="2025">2025</Option>
                                <Option value="2024">2024</Option>
                            </Select>
                        }

                        style={{
                            borderRadius: '12px',
                            border: '1px solid #F0F0F0', // lighter border (almost white)
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' // thicker, deeper shadow
                        }}

                    >
                        <ResponsiveContainer  width="100%" height={350}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D1D1F9" stopOpacity={.8} />
                                        <stop offset="95%" stopColor="#9898DD" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]}
                                    axisLine={false}
                                    tickLine={false}

                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#D1D1F9"
                                    fillOpacity={1}
                                    fill="url(#colorIncome)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
    </div>
  )
}
