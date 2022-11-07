const {
    twoSum,
    fetchProfile,
    removeNumberFromArray,
    addNewProperty,
    sortArray,
    upperCaseWords
} = require('./sandbox2')

describe('tests twoSum function', () => {
    test (`should return the array of the index positions of the two numbers 
    that equal to the target`, () => {
        expect(twoSum([1, 2, 3], 5)).toEqual([1,2])
    })

    test (`should return undefined if there are no pairs of numbers 
    that sum up to the target value`, () => {
        expect(twoSum([1, 2, 3], 9)).toBeUndefined();
        expect(twoSum([1, 2, 3], 9)).toBeFalsy();
    })
})

describe('tests fetchProfile function', () => {

    test('should return an email value of Shanna@melissa.tv', async() => {
        const data = await fetchProfile();
        expect(data.email).toBe('Shanna@melissa.tv')
    })

    test('should return a city value of Wisokyburgh', async() => {
        const data = await fetchProfile();
        expect(data.address.city).toBe('Wisokyburgh')
    })

    test('should return a company name of Deckow-Crist', async() => {
        const data = await fetchProfile();
        expect(data.company.name).toBe('Deckow-Crist')
    })

    test('should return true if data.address does not contain a zipcode of 90388-2220', async() => {
        const data = await fetchProfile();
        expect(data.address).not.toHaveProperty('zipcode','90388-2220')
    })
})

describe('tests removeNumberFromArray function', () => {
    test('should throw an error with text "Missing array" if no array is passed', () => {
        expect(() => removeNumberFromArray([])).toThrow(Error('Missing array'))
    })

    test('should return new array without the number that was removed', () => {
        expect(removeNumberFromArray([1, 2, 4], 2)).toEqual([1, 4])
    })

    test(`should throw an error with text "Array does not include number 
    include <specified number">`, () => {
        expect(() => removeNumberFromArray([1, 2, 4], 3).toThrow(Error(`Array does not include number ${numberToRemove}`)))
    })
})

describe(`tests addNewProperty function`, () => {
    test(`should throw an error with message "Mising both property and value"
    if property and value are undefined`, () => {
        expect(() => addNewProperty({}).toThrow(Error(`Missing both property and value`)))
    })

    test(`should return a new object with a new key value pair equal to the passed
    property and value`, () => {
        // const expected = {firstName: 'Tony', lastName: 'Kim'}
        expect(addNewProperty({firstName: 'Tony'}, 'lastName', 'Kim')).toMatchObject({firstName: 'Tony', lastName: 'Kim'})
        // expect(addNewProperty({firstName: 'Tony'}, 'lastName', 'Kim')).toHaveProperty({firstName: 'Tony', lastName: 'Kim'})
    })
})

describe(`tests sortArray function`, () => {
    test(`should throw new error with message "Missing array" if no array was passed in`, () => {
        expect(()=>sortArray([]).toThrow(Error('Missing array')))
    })

    test(`should return a new array with the numbers sorted out`, () => {
        expect(sortArray([1, 4, 2])).toEqual([1, 2, 4])
    })
})

describe(`tests upperCaseWords`, () => {
    test(`should throw new error with message "Missing words array" if no array was passed in`, () => {
        expect(()=>upperCaseWords([]).toThrow(Error('Missing words array')))
    })

    test(`should return a new array with all the letters in uppercase`, () => {
        expect(upperCaseWords(['cat', 'dog'])).toEqual(['CAT', 'DOG'])
    })
})