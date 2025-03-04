export interface IArrayStopsCity {
    DateArrive: string,
    TimeArrive: string,
    City: string,
    Name: string,
    Id: number | string |null,
    Latitude: string | null,
    Longitude: string | null
}

export function getArrayStopsCity (array: IArrayStopsCity[]) {
    if(array?.length === 0 || array === null || array === undefined) {
        return
    }else{
        const resultArrayStopsCitys = array.map((item: IArrayStopsCity) => {
            return item['City']
        })
        return resultArrayStopsCitys
    }
    

}