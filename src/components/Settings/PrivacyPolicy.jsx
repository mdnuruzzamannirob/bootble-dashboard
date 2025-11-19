import BackButton from '../SharedComponents/BackButton';
import FontFormatSection from '../SharedComponents/FontFormatSection';
import Intro from '../SharedComponents/Intro';
import Details from '../SharedComponents/Details';

import PrimaryButton from '../SharedComponents/PrimaryButton';

export default function PrivacyPolicy() {
    return (
        <>
            
                <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <BackButton text="Privacy Policy"></BackButton>
                            
                        </div>

                        {/* justify end */}
                        <FontFormatSection></FontFormatSection>
                    </div>


                    {/* Intro */}
                    <div className='mb-4'>
                        <h3 className='font-[Inter] font-medium text-[20px] mb-4'>1. Privacy</h3>
                        <Intro></Intro>
                    </div>

                    <div>
                        <h3 className='font-[Inter] font-medium text-[20px] mb-4'>2. Policy</h3>
                        <Details></Details>
                    </div>

                    {/* Button End */}
                    <div className="flex justify-center mt-24">
                        <PrimaryButton text="Save Change"></PrimaryButton>
                    </div>

                </div>
            
        </>
    )
}
