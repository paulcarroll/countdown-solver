var argv = require('minimist')(process.argv.slice(2));

/**
 * Array element swap function
 * 
 * WARNING: This will modify the array!
 */
let swap = function(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    return array;
};
  
/**
 * Heap's algorithm to permute the array combinations
 * https://paulrohan.medium.com/implemetning-heap-algorithm-to-find-permutation-of-a-set-of-numbers-in-javascript-d6b6ef8ee0e
 * 
 * WARNING: This will modify the array!
 */
let permutationHeap = function(array, result, n) {
    n = n || array.length; // set n default to array.length

    if (n === 1) {
        result(array);
    } else {
        for (var i = 1; i <= n; i++) {
            permutationHeap(array, result, n - 1);

            if (n % 2) {
                swap(array, 0, n - 1); // when length is odd so n % 2 is 1,  select the first number, then the second number, then the third number. . . to be swapped with the last number
            } else {
                swap(array, i - 1, n - 1); // when length is even so n % 2 is 0,  always select the first number with the last number
            }
        }
    }
};

/**
 * Recursively find all possible permutations of operators
 * against the set of values. This performs the calculations, and
 * tracks the equation that yielded each result.
 * 
 * e.g. Given the input n = 3, [a, b, c] we need to calculate the 
 * following permutations:
 * 
 *    a + b + c
 *    a + b - c
 *    a - b + c
 *    a - b - c
 *    a * b + c
 *    a * b / c
 * 
 * etc...
 */
function solve(n, values) {
    if (n <= 1) {
        values[0].sln += values[0].val;

        // Return last element as a single element array, this
        // will kick off the subsequent recursive evaluation
        return values;
    }

    const peek = solve(n - 1, values.slice(1, n.length));
    const m = values[0].val, r = [];
    
    peek.map(it => {
        r.push({ val: m + it.val, sln: `(${m} + ${it.sln})` });
        r.push({ val: m - it.val, sln: `(${m} - ${it.sln})` });
        r.push({ val: m * it.val, sln: `(${m} * ${it.sln})` });
        r.push({ val: m / it.val, sln: `(${m} / ${it.sln})` });
    });

    return r;
}

/**
 * Permutes all combinations of `set`
 * @param {*} set 
 * @param {*} target 
 */
function findSolution(set, target) {
    const perms = [];
    var count = 0;

    console.log(`Input values: ${set}`);
    console.log(`Target: ${target}`);
    console.log(`Solutions:`);

    // Find all permutations of `set` and enumerate, solving for each
    // While the permute operation uses the fast "Heap's algorithm" the solve
    // approach is definitely brute force and there may be a faster way to approach it.
    permutationHeap(set, perm => perms.push([...perm]));

    perms.forEach((perm) => {
        const row = perm.map(perm => ({ sln: '', val: perm }));
        const res = solve(row.length, row);
        
        // Find and log all solutions
        res.filter(it => it.val === target)
            .forEach((match, k) => {
                console.log(`(${count + k}) -> ${match.sln} = ${match.val}`);
            });

        count += res.length;
    });

    console.log(`Permutations: ${count}`);
}

/**
 * Main program entry point
 * Parse arguments and setup defaults if required
 */
function main() {
    var set = argv.set;
    var target = argv.target;

    // Set defaults if required
    try {
        if (!set) {
            set = '50, 8, 3, 7, 2, 10';
            target = 556;

            console.log('Parameters not provided, using demo set -> [50 8 3 7 2 10] and target -> 556');
        }
        else {
            if (!target) {
                throw 'Missing --target';
            }
        }
    }
    catch (e) {
        console.error('ERROR: ' + e);
        console.log('\nUsage: npm index.js [options]\n' +
            'Options:\n' + 
            '--set "<value>"     Where value is a set of space separated integers\n' +
            '--target <value>    Where value is the integer solution value to be found (required if set was provided)');

        process.exit(0);
    }

    set = set.trim(' ').split(' ').map(i => parseInt(i, 10));

    findSolution(set, target);
}

main();

