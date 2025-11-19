
import Container from '../SharedComponents/Container';
import FontFormatSection from '../SharedComponents/FontFormatSection'
import BackButton from '../SharedComponents/BackButton';
import PrimaryButton from '../SharedComponents/PrimaryButton';
export default function HelpSupport() {
    return (
        <>
            
                <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        
                        <BackButton text="Help & Support"></BackButton>

                        {/* justify end */}
                        <FontFormatSection></FontFormatSection>

                    </div>


                    {/* Intro */}
                    <div className='mb-4'>
                        <h3 className='font-[Inter] font-medium text-[20px] mb-4'>1. Intro</h3>
                        <p className='font-[Inter] font-normal text-[16px] text-[#333333] leading-10'>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>
                    </div>

                    <div>
                        <h3 className='font-[Inter] font-medium text-[20px] mb-4'>2. Details</h3>
                        <p className='font-[Inter] font-normal text-[16px] text-[#333333] leading-10'>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.There are many variations of passages of Lorem Ipsum available, but the majority.
                        </p>
                    </div>

                    {/* Button End */}
                    <div className="flex justify-center mt-24">
                        
                        <PrimaryButton text="Save Change"></PrimaryButton>
                    </div>

                </div>
           
        </>
    )
}

