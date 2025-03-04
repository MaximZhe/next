'use client'

import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from "swiper";
import Image from 'next/image';
import Bus from './bus.jpg';
import BusTwo from './bus1.jpg';
import BusThree from './bus2.jpg';
import BusFour from './bus3.jpg';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';



interface ISliderSeo {

    className: string
}
const SliderSeo: FC<ISliderSeo> = ({ className }) => {

    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const arrayImages = [Bus, BusTwo, BusThree, BusFour];
    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [swiper]);
    return (
        <>
            <div className='routes__wrapper'>
            </div>
            <Swiper className={`slider ${className}`} loop={true}
                onSwiper={setSwiper}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                spaceBetween={32}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    480: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },

                    991: {
                        slidesPerView: 1,
                    },
                }}
            >
                {arrayImages.map((image, index) => (
                    <SwiperSlide

                        className='slide' key={index}
                    >
                        <div>
                            <Image src={image} alt="image" width={350} height={425} />
                        </div>
                    </SwiperSlide>
                ))}



            </Swiper>
        </>
    );
};

export default SliderSeo;