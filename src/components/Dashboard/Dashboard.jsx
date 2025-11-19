import React from 'react'
import Barchart from './Barchart';
import HelpCenter from './Support';
import { Outlet } from 'react-router-dom';
import Graph from './Graph';
import FlexBox from './FlexBox';
import Container from '../SharedComponents/Container';
import ProfileUserImg from '/images/profile-user.png';
import LayerOneImg from '/images/Layer_1.png';
import GroupImg from '/images/Group.png';
import LayerTwoImg from '/images/Layer_2.png';
import users from '../../assets/images/users.svg'
import subscriptions from '../../assets/images/subscriptions.svg'
import meditation from '../../assets/images/meditation.svg'
import RecentUsers from '../User/RecentUsers';


export default function Dashboard() {
    return (
        <>
           
                {/* Dashboard top */}
                <div className=' grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8  pb-8'>
                    <div>
                        <FlexBox text="Total Users" img={users} amount="852,650"></FlexBox>
                    </div>

                   

                    <div>
                        <FlexBox text="Subscription" img={subscriptions} amount="2,500"></FlexBox>
                    </div>

                    <div>
                        <FlexBox text="Total Meditation" img={meditation} amount="358"></FlexBox>
                    </div>

                </div>

                {/* Dashboard middle */}
                <div className='grid grid-cols-1 lg:grid-cols-2 mb-8 gap-8 '>
                    {/* graph one */}
                    <div className=''>
                        <Graph></Graph>
                    </div>

                    {/* graph two */}
                    <div >
                        <Barchart></Barchart>
                    </div>
                </div>

                {/* Dashboard bottom */}
                <div className=''>
                    {/* <HelpCenter></HelpCenter> */}
                    <RecentUsers />
                </div>
          

        </>
    )
}
