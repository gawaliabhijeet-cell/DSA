var TimeLimitedCache = function() {
        this.cache = new Map();

};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
      const currentTime = Date.now();

    // Check if key already exists and has not expired
    const existing = this.cache.get(key);

    const isUnexpired = existing && existing.expiry > currentTime;

    // Store the new value and expiration time
    this.cache.set(key, {
        value: value,
        expiry: currentTime + duration
    });

    return !!isUnexpired;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    const currentTime = Date.now();
    const item = this.cache.get(key);

    // Key does not exist
    if (!item) {
        return -1;
    }

    // Key has expired
    if (item.expiry <= currentTime) {
        this.cache.delete(key);
        return -1;
    }

    // Key is still valid
    return item.value;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
       const currentTime = Date.now();
    let count = 0;

    for (const [key, item] of this.cache) {
        if (item.expiry > currentTime) {
            count++;
        } else {
            // Remove expired key
            this.cache.delete(key);
        }
    }

    return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */