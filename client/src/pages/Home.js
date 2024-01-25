import React from "react";
import HomeCarousel from "../components/carousel";

const home = () => {
    return (
        <div className= 'p-1'>
            <div className='row flex flex-wrap p-1 border w-50'>
                <HomeCarousel />
            </div>
        </div>
    )
};

export default home;