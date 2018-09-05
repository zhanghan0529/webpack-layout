export default function demo(){
    let arr = new Set([1,2,3,4,5,6]);
    console.log([...arr].map( x => x*x))
}
