'use client'

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from "swiper";
import SliderNavButtons from './SliderNavButtons/SliderNavButtons';
import SliderTabsButtons from './SliderTabsButtons/SliderTabsButtons';

import style from './Slider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

import ButtonRoutes from '../Button/ButtonRoutes/ButtonRoutes';
import { sliderRoutesInternational, sliderRoutesRussia } from '@/app/constant/constant';
import SlideItem from './SlideItem/SlideItem';
import GridLoader from 'react-spinners/GridLoader';



const Slider = ({ title, className }: { title: string, className: string }) => {
    const [activeTab, setActiveTab] = useState('russia');
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [sliderData, setSliderData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [countSkeleton, setCountSkeleton] = useState(3);
    useEffect(() => {
        if (sliderRoutesRussia) {
            setSliderData(sliderRoutesRussia);
            setIsLoading(false);
        }
    }, [])

    const handleReachEnd = () => {
        setIsFirstSlide(false);
        setIsLastSlide(false);
    };

    const handleReachBeginning = () => {
        setIsFirstSlide(false);
        setIsLastSlide(false);

    };

    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [swiper]);

    const handleSlidePrev = () => {
        if (swiper) {
            swiper.slidePrev();
        }
    };

    const handleNavButtonNext = () => {
        if (swiper) {
            swiper.slideNext()
        }
    };

    const handleClick = (name: string) => {
        setActiveTab(name);
    }
  
    return (
        <div className={style.routes} id='slider'>
            <div className='container'>
                <div className={style['routes__wrapper']}>
                    <h2 className={style['routes__title']}>
                        {title}
                    </h2>
                    <SliderTabsButtons activeTab={activeTab}
                        handleClick={(name) => handleClick(name)}
                    />
                    <SliderNavButtons
                        handleSlidePrev={handleSlidePrev}
                        handleNavButtonNext={handleNavButtonNext}
                        firstSlide={isFirstSlide}
                        lastSlide={isLastSlide}
                    />
                </div>
                {isLoading ? (
                    <div style={{ display: 'flex', gap: '0 15px' }}>
                        {Array.from({ length: countSkeleton }).map((_, index) => (
                            <div key={index} className={style['slide-count']} data-slide={`${index}`} style={{ flexDirection: 'column', justifyContent: 'end', maxWidth: '378px', width: "100%", margin: '25px auto 0', borderRadius: '12px', background: '#ffffff', alignItems: 'center', padding: '24px', height: '280px', gap: '40px 0' }}>
                                <GridLoader color={'#0243A6'} loading={true} size={10} />
                                <div style={{ maxWidth: '92%', height: '48px', borderRadius: '12px', padding: '12px 24px', background: '#cbcaca', width: "100%" }}>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper className={`slider ${className}`} loop={true}
                        onReachEnd={handleReachEnd}
                        onReachBeginning={handleReachBeginning}
                        onSwiper={setSwiper}
                        modules={[Navigation]}
                        spaceBetween={32}
                        breakpoints={{
                            480: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 2,
                            },

                            991: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {activeTab === 'russia' ?
                            sliderRoutesRussia.map((slide) => (
                                <SwiperSlide
                                    key={slide.id}
                                    className='slide'
                                >
                                    <SlideItem data={slide} />
                                </SwiperSlide>
                            )) :
                            sliderRoutesInternational.map((slide) => (
                                <SwiperSlide
                                    key={slide.id}
                                >
                                    <SlideItem data={slide} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
                }

                {/* <div className={style['routes-more']}>
                    <ButtonRoutes to={{ pathname: '/' }} title={'Все маршруты'} className={style['routes-more__link']} />
                </div> */}
            </div>
        </div>
    );
};

export default Slider;