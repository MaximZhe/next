import Image from 'next/image';
import WifiBlue from '@/../../public/icons/wifi-blue.svg';
import UsbBlue from '@/../../public/icons/usb-blue.svg';
import AirBlue from '@/../../public/icons/air-blue.svg';
import Suitcase from '@/../../public/icons/Suitcase.svg';
import SeatBlue from '@/../../public/icons/Seat.svg';
const BenefitsIcons = () => {
    return (
        <>
            <Image src={WifiBlue} width={32} height={32} alt=''/>
            <Image src={UsbBlue} width={32} height={32} alt=''/>
            <Image src={AirBlue} width={32} height={32} alt=''/>
            <Image src={Suitcase} width={32} height={32} alt=''/>
            <Image src={SeatBlue} width={32} height={32} alt=''/>
        </>
    );
};

export default BenefitsIcons;