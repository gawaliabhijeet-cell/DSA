/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
 const toBe = (other) => {
    if(val === other){
        return true
    }
    throw new Error("Not Equal")
   }
  const notToBe=(other) => {
    if(val !== other) return true;
    throw new Error("Equal")
   }

   return {
    toBe, notToBe
   }
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */