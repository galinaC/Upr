
/*
Criteria
(3): cellTypeIsTextOrEnum + COLUMN_TYPE
(4): All above + round
(5): All above + inlineStyle
(6): All above +  distinct
 */

export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};

/**
  * Определя дали дадената клетка от таблицата е от тип „текст“ или „енум“
  * @param {HTMLElement} клетка - HTML елементът, представляващ клетката на таблицата.
  * @returns {boolean} - Връща true, ако клетката е от тип 'text' или 'enum', false в противен случай.
  */
export function cellTypeIsTextOrEnum(cell) { //Тази функция приема клетка с един параметър, която е HTML елемент, който представлява клетка от таблица.
    const cellType = cell.getAttribute('cell-type');// Функцията проверява дали типът клетка е TEXT или ENUM
    return cellType == COLUMN_TYPE.TEXT || cellType == COLUMN_TYPE.ENUM; //Връща булева стойност, true, ако типът на клетката е TEXT или ENUM, false в противен случай е false.

}


/**
  * Връща ширината по подразбиране за дадения тип колона.
  * @param {string} type - Типът на колоната.
  * @returns {number} - Ширината по подразбиране за дадения тип колона.
  */
function getDefaultTypeWidth(type) {      // Тази функция приема един тип параметър, който е низ, представляващ тип колона.
    switch (type) {                      //Връща ширината по подразбиране за дадения тип колона.
        case COLUMN_TYPE.TIME:
        case COLUMN_TYPE.TIMESPAN:
            return 80;             
        case COLUMN_TYPE.NUMBER:
        case COLUMN_TYPE.CURRENCY:
            return 90;
        case COLUMN_TYPE.DATE:
            return 130;
        case COLUMN_TYPE.CHECKBOX:
            return 80;
        case COLUMN_TYPE.STATUS:
            return 20;
        default:
            return 44;                //Функцията връща число, представляващо ширината по подразбиране за дадения тип колона.
    }
}

/**
  * Закръгля даденото число до посочения брой десетични знаци (по подразбиране е 2) и връща резултата.
  * @param {number} number - Числото, което трябва да бъде закръглено.
  * @param {number} [decimal=2] - Броят на десетичните знаци, до които да се закръгли (по подразбиране е 2).
  * @се завръща
//*/
export function round(number, decimals) {
    if (!decimals)
        decimals = 2;

    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

/**

Задава атрибути на вграден стил към дадения елемент въз основа на свойството за ширина на дадения обект.
@param {HTMLElement} ел
@връща обект в стил {object} с атрибути minWidth и maxWidth. */
export function inlineStyle(el) { 
    if (!this.width || this.width === 'auto') // Задава атрибути на вграден стил (minWidth, maxWidth) към дадения елемент въз основа на свойството за ширина на дадения обект.
        this.width = getDefaultTypeWidth(this.type);

    let style;
    if (this.width == null) {
        style = {};
    } else if (this.scaled) {
        style = { minWidth: `${this.width}px` };
    } else {
        style = {
            minWidth: `${this.width}px`,
            maxWidth: `${this.width}px`
        };
    }

    if (el) {
        el.style.minWidth = style.minWidth;
        el.style.maxWidth = style.maxWidth;
    }

    return style; // Връща стиловия обект с атрибути minWidth и maxWidth.
}
/**

Връща нов масив с отделни елементи въз основа на функцията за избор (ако е предоставена).
@param {Array} масив
@param {Функция} [селектор] (по избор)
@returns {Array} Нов масив с отделни елементи.
*/
export function distinct(array, selector) { //  Array (масив), Function (селектор) (optional)
    var map = new Map(),
        result = [];

    try {
        for (let i = 0; i < array.length; i++) {
            if (selector) {
                let key = selector(array[i]);

                if (map.has(key))
                    continue;

                result.push(array[i]);
                map.set(key);
            } else if (result.indexOf(array[i]) === -1) {
                result.push(array[i]);
            }
        }
// Връща нов масив с отделни елементи.
        return result; 
    } catch (e) {
        throw new Error(e.message);
    }
}