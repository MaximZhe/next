
import { useFormContext } from 'react-hook-form';

import style from './СonsentBox.module.scss';
import Link from 'next/link';
import { ErrorMessage } from '@hookform/error-message';
const СonsentBox = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <>
            <div className={style['promo-order-form__checkboxs']}>
                <div className={style['promo-order-form__box']}>
                    <div className={style['promo-order-form__error']}>
                        <ErrorMessage errors={errors} name={`termsAcceptedPolity`} />
                    </div>
                    <div className={`${style['promo-order-form__check']} ${errors.termsAcceptedPolity ? style['error-validate'] : ''}`}>
                        <input
                            type='checkbox'
                            {...register('termsAcceptedPolity', { required: 'Пожалуйста, примите условия' })}
                        />
                        <label >Принимаю условия <Link href='/policy' target='_blank'>пользовательского соглашения и политики конфеденциальности</Link></label>

                    </div>

                </div>
                <div className={style['promo-order-form__box']}>
                    <div className={style['promo-order-form__error']}>
                        <ErrorMessage errors={errors} name={`termsAcceptedProcessing`} />
                    </div>
                <div className={`${style['promo-order-form__check']} ${errors.termsAcceptedProcessing ? style['error-validate'] : ''}`}>
                    <input
                        type='checkbox'
                        {...register('termsAcceptedProcessing', { required: 'Пожалуйста, примите условия' })}
                    />
                    <label>Даю согласие на <Link href='/pages/agreement' target='_blank'>обработку персональных данных</Link> </label>
                </div>
                </div>
            </div>

        </>
    );
};

export default СonsentBox;