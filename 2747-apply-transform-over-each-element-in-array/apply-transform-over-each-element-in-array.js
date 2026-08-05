/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {

  let array = []  // first create a empty arrary
   for(i = 0; i< arr.length; i= i +1){
   array.push(fn(arr[i],i))
   // Apply function and store result
   } 
   return array
};