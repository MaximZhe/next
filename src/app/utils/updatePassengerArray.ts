export function updatePassengerArray(updatedPassengers: any, userCount: number): any {
    const passengerKeys = Object.keys(updatedPassengers);
    
    if (passengerKeys.length > userCount) {
        const slicedPassengers: any = {};
        for (let i = 0; i < userCount; i++) {
            const key = passengerKeys[i];
            if (key) {
                slicedPassengers[key] = updatedPassengers[key];
            } else {
                break; 
            }
        }
        return slicedPassengers;
    } else {
        return updatedPassengers;
    }
}