'use client'

import ArrowIcon from "@/app/icons/svg/ArrowIcon";
import style from './SliderNavButtons.module.scss';

interface SliderNavButtonsProps {
  handleSlidePrev: () => void;
  handleNavButtonNext: () => void;
  lastSlide: boolean;
  firstSlide: boolean;
}

const SliderNavButtons: React.FC<SliderNavButtonsProps> = ({
  handleSlidePrev,
  handleNavButtonNext,
  lastSlide,
  firstSlide
}) => {
  const handlePrevButtonClick = () => {
    handleSlidePrev();
  };

  const handleNextButtonClick = () => {
    handleNavButtonNext();
  };

  return (
    <div className={style['slider-nav']}>
      <button
    disabled={firstSlide}
    type='button'
    className={`${style['slider-nav__btn']} ${firstSlide ? style.disabled : ''} prev`}
    onClick={handlePrevButtonClick}
    aria-label="Предыдущий слайд" 
    aria-disabled={firstSlide} 
>
    <ArrowIcon />
</button>

<button
    disabled={lastSlide}
    type='button'
    className={`${style['slider-nav__btn']} ${lastSlide ? style.disabled : ''} next`}
    onClick={handleNextButtonClick}
    aria-label="Следующий слайд" 
    aria-disabled={lastSlide} 
>
    <ArrowIcon />
</button>
    </div>
  );
};

export default SliderNavButtons;