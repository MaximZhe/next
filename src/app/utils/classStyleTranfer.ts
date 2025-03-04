
export function SwitchClassImg(widht: number, transfer: number){
    if(widht > 768 ){
        if(transfer == 1){
            return `list-item-spent__img-one`;
        }else if(transfer == 2){
            return `list-item-spent__img-two`;
        }else if(transfer == 3){
            return `list-item-spent__img-three`;
        }else{
            return `list-item-spent__img`;
        }
    }   
}
