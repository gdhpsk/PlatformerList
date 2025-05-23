/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 100) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
   // pt formula for 250 points
   /*
     (-24.9975/1.04299*Math.pow((rank-1)*(3 + (1/24.481)), 0.4) + 250) *
    ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula
    // let score = (-24.9975/1.32487724*Math.pow((rank-1)*(3 + (1/24.481)), 0.4) + 200) *
    //     ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    let a = -0.00133411
    let v = 2.77381
    let b = 0.0960968
    let c = -6.87599
    let d = 206.78122731
    
    let score = a*(rank**v) + b*(rank**2) + c*rank + d
    

    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
