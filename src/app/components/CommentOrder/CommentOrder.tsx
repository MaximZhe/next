import React from 'react';
import { useFormContext } from 'react-hook-form';

import style from './CommentOrder.module.scss';
import { ErrorMessage } from '@hookform/error-message';

const CommentOrder = () => {
    const { register, watch, formState: { errors } } = useFormContext();
    const noteUser = watch('Note');
    const textareaClass = noteUser ? `${style.active}` : '';

    return (
        <div className={style['comment-user']}>
            <h3 className={style['comment-user__title']}>
                Дополнительная информация
            </h3>
            <div className={style['comment-user-form__textarea']}>
                        <div className={style['comment-user-form__wrapper']}>
                            <textarea rows={4} id='note' {...register('Note')} />
                            <label className={`${noteUser ? style.active : ""}`}>Примечания</label>
                        </div>

                        {errors.Note && (
                            <div className={style['comment-user-form__error']}>
                                <ErrorMessage errors={errors} name="Note" />
                            </div>
                        )}
                    </div>
        </div>
    );
};

export default CommentOrder;