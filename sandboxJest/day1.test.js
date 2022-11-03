const {
    twoNumbers,
    stringTest,
    arrayTest,
    objectTest
} = require ('./day1')
//! ----------------------------------------------------------------------------------------------------------------
let name = 't';

beforeAll(() => {
    name = 'ti';
})

test(`should expect the value of name to not be equal to 'ti'`, () => {
    name = 'tin'
    expect(name).not.toEqual('ti')
})

afterAll(() => {
    name = 'done';
})

//! ----------------------------------------------------------------------------------------------------------------

describe('tests two numbers function', () => {
    test(`should return a text that says two numbers are equal if num1 is equal to num2
          and expects the value to be truthy`, () =>{
        expect(twoNumbers(1,1)).toBe('two numbers are equal')
        expect(twoNumbers(1,1)).toBeTruthy()
    })

    test(`should return the difference between num1 and num2 if num1 is greater than num2
          and expects the value to not be null`, () => {
        expect(twoNumbers(9,5)).toBe(4)
        expect(twoNumbers(9,5)).not.toBeNull()
    })

    test(`should return the sum of num1 and num2 if num1 is less than num2
          and expects the value to be greater than 0`, () => {
        expect(twoNumbers(5,9)).toBe(14)
        expect(twoNumbers(5,9)).toBeGreaterThan(0)
    })

    test(`should return a text that says missing numbers if arguments are missing`, () => {
        expect(twoNumbers(9)).toBe('missing numbers')
    })
})

//! ----------------------------------------------------------------------------------------------------------------

describe('tests stringTest function', () => {
    test(`should return false if the argument is empty or undefined`, () => {
        expect(stringTest(undefined)).toBe(false)
        expect(stringTest()).not.toBeTruthy();
    })

    test(`should return the index of t if the letter 't' is in the argument and expects
          the value to be greater than 0`, () => {
        expect(stringTest('string')).toBe(1)
        expect(stringTest('string')).toBeGreaterThan(0)
    })

    test(`should return a text that says letter 't' was not found if there is no 't' in the string`, () => {
        expect(stringTest('beans')).toBe(`Letter 't' was not found`)
    })
})

//! ----------------------------------------------------------------------------------------------------------------

describe('tests arrayTest function', () => {
    test(`should return false if the array is undefined or empty`, () => {
        expect(arrayTest([]).length).toBeFalsy();
        expect(arrayTest().length).toBeFalsy();
    })

    test(`should return true if the array contains the number 5`, () => {
        expect(arrayTest([1, 2, 3, 4, 5])).toBeTruthy();
    })

    test(`should return a new array with the vales of twice each element if there is no number 5`, () => {
        expect(arrayTest([1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    })
})

//! ----------------------------------------------------------------------------------------------------------------

describe('tests objectTest function', () => {
    test(`should return false if the object is undefined or empty`, () => {
        expect(objectTest({})).toBeFalsy();
    })

    test(`should return true if the object contains a value pair of name: 'tony' `, () => {
        expect(objectTest({name: 'tony'})).toBeTruthy();
    })

    test(`should return false if the object is undefined or empty`, () => {
        expect(() => objectTest({name: 'kim'})).toThrow(Error);
    })
})