export function percentDifferenceCounter(price, price2) {
    return +(100 * Math.abs((price-price2) / ( (price+price2)/2) )).toFixed(2);
}

export function capitalize(str){
    return str.charAt(0).toUpperCase()+str.substr(1)
}

export async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value).then(()=>{console.log("Copied?")});
}