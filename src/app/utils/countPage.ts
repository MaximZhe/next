export function getTotalPageCount (totalCountPage:any, limit:any){
    return Math.ceil(totalCountPage / limit)
}