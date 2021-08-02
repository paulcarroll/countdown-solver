
# Countdown solver

Countdown is a TV show that had a segment where the contestants would be asked to select a random set of predetermined numbers and a random target value, then write a formula (with only the common arithmetic operations) to get as close to the target as possible.

## Execute

Install dependencies

```bash
npm i
```

To run the demo set

```bash
npm start
```

To invoke with your own set simply pass a list of space separated integers and a target value, like so:

```bash
$> node index.js --set '3 6 10' --target 1
Input values: 3,6,10
Target: 1
Solutions:
(32) -> (10 - (3 + 6)) = 1
(80) -> (10 - (6 + 3)) = 1
Permutations: 96
```

## Example

For example, given the set `[10, 50, 8, 3, 7, 2]` attempt to reach `556` could be done with `(3 - (7 + (10 * (2 - (50 + 8))))) = 556`. Checking the output of the program though shows us that there are actually a number of solutions!

```
Input values: 50,8,3,7,2,10
Target: 556
Solutions:
(8192) -> (3 - (7 - (8 * (50 + (2 * 10))))) = 556
(137216) -> (3 - (7 - (10 * (8 - (2 - 50))))) = 556
(149504) -> (8 / (2 / (10 - (3 * (7 - 50))))) = 556
(174080) -> (10 - (7 * (2 * (8 + (3 - 50))))) = 556
(177152) -> (10 - (2 * (7 * (8 + (3 - 50))))) = 556
(202752) -> (10 - (7 * (2 * (3 + (8 - 50))))) = 556
(205824) -> (10 - (2 * (7 * (3 + (8 - 50))))) = 556
(219136) -> (3 - (7 + (10 * (2 - (8 + 50))))) = 556
(260096) -> (3 - (7 - (10 * (50 - (2 - 8))))) = 556
(296960) -> (10 + (7 * (2 * (50 - (3 + 8))))) = 556
(300032) -> (10 + (2 * (7 * (50 - (3 + 8))))) = 556
(325632) -> (10 - (7 * (2 * (3 - (50 - 8))))) = 556
(328704) -> (10 - (2 * (7 * (3 - (50 - 8))))) = 556
(342016) -> (3 - (7 + (10 * (2 - (50 + 8))))) = 556
(405504) -> (8 - (2 + (50 * (10 - (7 * 3))))) = 556
(419840) -> (10 + (7 * (2 * (50 - (8 + 3))))) = 556
(422912) -> (10 + (2 * (7 * (50 - (8 + 3))))) = 556
(448512) -> (10 - (7 * (2 * (8 - (50 - 3))))) = 556
(451584) -> (10 - (2 * (7 * (8 - (50 - 3))))) = 556
(528384) -> (8 - (2 + (50 * (10 - (3 * 7))))) = 556
(581632) -> (8 / (2 / (10 + (3 * (50 - 7))))) = 556
(625664) -> (8 * (50 + (3 * (10 - (7 / 2))))) = 556
(663552) -> (3 - (7 - (10 * (50 + (8 - 2))))) = 556
(698368) -> (3 - (7 - (10 * (8 + (50 - 2))))) = 556
(720896) -> (3 - (7 - (8 * (50 + (10 * 2))))) = 556
Permutations: 737280
```

These equations can of course be independently verified by running them in the Chrome console (or evaluating them in Javascript).

## The solution

The solution is rather simple (albeit a little brute force):

1. Heap's algorithm is used to calculate the permutations of the set (as most operators are *not* commutative)
1. The set combinations are then recursively processed and each combination is evaluated. This is done by:
  a. If `set` has one value, then return
  b. Otherwise truncate the set and recurse, then add all operations to the result set and return
1. All matching the target values are output
