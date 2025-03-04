

import ActionIconLine from '../../../icons/image/actions-bg.png';
import ActionIconLineMobail from '../../../icons/image/actions-bg-mobail.png';
import style from './Actions.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const url = process.env.NEXT_PUBLIC_APY_URL
const getMainActionData = async () => {

    const data = {
        ContentType: "Action",
        Main: true,
        PageSize: 1,
        Page: 0,
        SiteId: 2,
        Lang: "RUS"
    }
    try {
        const response = await fetch(`${url}/api/v1/news/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const dat = await response.json();
        return dat
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
const Actions = async () => {

    const resultActionDatas = await getMainActionData();

    return (
        <section className={style.actions}>
            <div className='container'>
                <div className={style['actions__wrapper']}>
                    <div className={style['actions-content']}>
                        <h3 className={style['actions-content__title']}>
                            {resultActionDatas?.Result?.Collection[0]?.Name ? resultActionDatas?.Result?.Collection[0]?.Name : 'Акции и скидки'}
                        </h3>
                        <p className={style['actions-content__text']}>
                            {resultActionDatas?.Result?.Collection[0]?.DescribeShort ? resultActionDatas?.Result?.Collection[0]?.DescribeShort : 'Следите за нашими акциями и скидками'}
                        </p>
                    </div>
                    <div className={style['actions__img']} >
                        <Image
                            src={ActionIconLine}
                            width={333}
                            height={140}
                            alt=''
                            className={style['actions__img-desktop']} />
                        <Image
                            src={ActionIconLineMobail}
                            width={128}
                            height={142}
                            alt=''
                            className={style['actions__img-mobail']} />
                    </div>
                    <Link className={style['actions__link']} href={resultActionDatas?.Result?.Collection[0]?.NiceUrl ? `akcii/${resultActionDatas?.Result?.Collection[0]?.NiceUrl} ` : 'akcii'}>
                        Узнать подробности
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Actions;