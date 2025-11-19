import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AddFAQModal from './AddFAQModal';
import Container from '../SharedComponents/Container';
import BackButton from '../SharedComponents/BackButton';
import PrimaryButton from '../SharedComponents/PrimaryButton';
import { RiDeleteBin6Line } from "react-icons/ri";

import DeleteSign from '/images/delete-yellow.png'

const faqs = [
    {
        id: 1,
        question: 'Are all your products authentic?',
        answer: 'Yes — we guarantee that every product we sell is 100% authentic. All sealed Pokémon items come directly from trusted distributors, and our sports singles and jerseys are carefully sourced.'
    },
    {
        id: 2,
        question: 'How do I know what condition my card or product is in?',
        answer: 'We clearly describe the condition of every item in the product details — whether it’s brand new, factory-sealed, or lightly handled. If you ever want extra photos or info, just reach out to us before you order!'
    },
    {
        id: 3,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major debit and credit cards, PayPal, and [any local options, like bKash]. All payments are processed securely — we never store your card information.'
    },
    {
        id: 4,
        question: 'How long does shipping take?',
        answer: 'Orders are usually processed within 1–2 business days. Shipping times vary by location, but you\'ll always get a tracking number to follow your order from our door to yours.'
    }
];

export default function FAQs() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () =>{
        setIsModalVisible(true);
    };
    const handleCancel =() => {
        setIsModalVisible(false);
    }
    return (
        <>
           
                <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
        
                    <BackButton text="FAQs"></BackButton>


                </div>


                {/* FAQ Grid */}
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-20 gap-y-10 px-10 py-8">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="relative pr-8">
                            <span className="text-[14px] text-black font-medium font-[Inter]">Question no: {faq.id}</span>
                            <div className='flex justify-between items-start'>
                                <h3 className="mt-1 text-[16px] font-semibold text-black font-[Inter]">{faq.question}</h3>
                                {/* <Button style={{ border: 'none', boxShadow: 'none' }}
                                    className="p-0"><img className='w-[24px] h-[24px]' src={DeleteSign} alt="delete" /></Button> */}
                                    <button className='text-red-600 text-xl'>
                                        <RiDeleteBin6Line />
                                    </button>
                            </div>
                            <p className="mt-2 text-[#333333] text-[15px] leading-[28px] font-[Inter]">{faq.answer}</p>
                            {/* <DeleteOutlined className="absolute top-0 right-0 text-[#E4AF00] cursor-pointer" /> */}

                        </div>
                    ))}
                </div>


                {/* Button End */}
                <div className="flex justify-center mt-32">
                    
                    <PrimaryButton 
                    text="Add FAQ" 
                    icon={<PlusOutlined />} 
                    onClick={showModal}>
                    </PrimaryButton>

                    {/* Show Modal */}
                    <AddFAQModal open={isModalVisible} onCancel={handleCancel} />

                </div>

            </div>
           
        </>
    )
}
