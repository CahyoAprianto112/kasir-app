// arrow function
export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // return new Intl.NumberFormat("id-ID", {
    //     style: "currency",
    //     currency: "IDR",
    // }).format(number);
}