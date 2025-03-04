
interface IDataDecoderTicketsBlob {
    Blob: string
}
export function decoderTicketsBlob (data:any) {
    const base64String =  data
    const decodedData = atob(base64String);

    const byteArray = new Uint8Array(decodedData.length);
    for (var i = 0; i < decodedData.length; i++) {
        byteArray[i] = decodedData.charCodeAt(i);
    }
    
    const blob = new Blob([byteArray], { type: "application/pdf" });
    
    const url = URL.createObjectURL(blob);
    return url
}