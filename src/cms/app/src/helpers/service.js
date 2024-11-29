// Return a array value is start to end
module.exports.range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_,idx) => idx + start)
}

// Sort 
// module.exports.sort = (data, atr) => {
//     if (atr === 'name') {
//         data.sort((a, b) => a.name.)
//     }
// }