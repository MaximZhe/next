
'use server';


import style from '../../../components/ContentSeoRoute/routeDescription.module.scss'
const ScheduleAll = async ({
    schedules = '8',
    halfScheduleItems,
  }: {
    schedules: string,
    halfScheduleItems:any
  }) => {
    return (
        
        <div className={style['path-description-schedule__content']}>
        {halfScheduleItems.slice(0, parseInt(schedules)).map((item: any, id: number) => {
            return (

                <p key={id} className={style['path-description-schedule__text']}>
                    {item['schedule__text']}
                </p>
            )
        })}

    </div>
    );
    
};

export default ScheduleAll;