
import style from './PaymentOption.module.scss';
import Image from 'next/image';
import visa from '../../../icons/image/visa-card.svg';
import master from '../../../icons/image/master-card.svg'
import mir from '../../../icons/image/mir-card.svg'
import alpha from '../../../icons/image/alpha-card.svg'
const PaymentOption = ({className}:{className:string}) => {
    return (
        <div className={`${style.payment} ${className}`}>
            <Image src={visa} className={style['payment__image']} width={40} height={40} alt={''} />
            <Image src={master} className={style['payment__image']} width={40} height={40} alt={''} />
            <Image src={mir} className={style['payment__image']} width={40} height={40} alt={''} />
            <Image src={alpha} className={style['payment__image']} width={40} height={40} alt={''} />
        </div>
    );
};

export default PaymentOption;