import {FC, useState} from 'react'
import {useModel} from 'umi'
import {isLogin} from "@/utils";
import VipPc from "@/pages/Vip/pc";
import device from 'current-device'
import VipMobile from "@/pages/Vip/mobile";

const Vip: FC = () => {
    const {openPriceModal, setPriceType, openLoginModal} = useModel('userModel')
    const [timeType, setTimeType] = useState<'month' | 'year'>('year')

    const priceList = {
        month: {
            pro: {
                id: 'one_month_paid_pro',
                name: 'ZHIKE Pro 年度会员',
                all: '60',
                month: '60',
                day: '2',
            },
            pro_plus: {
                id: 'one_month_paid_pro_plus',
                name: 'ZHIKE Pro+ 年度会员',
                all: '120',
                month: '120',
                day: '3.9'
            }
        },
        year: {
            pro: {
                id: 'one_year_paid_pro',
                name: 'ZHIKE Pro 年度会员',
                all: '480',
                month: '40',
                day: '1.4'
            },
            pro_plus: {
                id: 'one_year_paid_pro_plus',
                name: 'ZHIKE Pro+ 年度会员',
                all: '960',
                month: '80',
                day: '2.7'
            }
        }
    }

    const recharge = (type) => {
        if (isLogin()) {
            setPriceType(priceList[timeType][type])
            openPriceModal()
        } else {
            openLoginModal()
        }
    }


    return (
        <>
            {
                device.mobile() ?
                    <VipMobile data={{timeType, setTimeType, priceList, recharge}}/> :
                    <VipPc data={{timeType, setTimeType, priceList, recharge}}/>
            }
        </>
    )
}

export default Vip
