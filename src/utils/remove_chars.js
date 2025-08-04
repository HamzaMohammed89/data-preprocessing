const purge_constant = require('./remove_constants');


/**
 * Remove column(s) if all rows contain characters
 * @param {*} options 
 * @returns 
 */
const rm_char_col = function (options) {

    let data = options.data;
    let column_name = Object.keys(data[0]);

    column_name.forEach(_new_column_name => {
        const check_string_column = [];
        for (let col_check = 0; col_check < data.length; col_check++) {
            if (typeof (+data[col_check][_new_column_name]) === 'number' && !isNaN(+data[col_check][_new_column_name])) {
                check_string_column.push(data[col_check][_new_column_name]);
            }
        }
        if ((check_string_column.length === 0) || (check_string_column.length === 1)) {

            // entire column has characters, peforming column deletion
            for (let empty_col = 0; empty_col < data.length; empty_col++) {
                delete data[empty_col][_new_column_name];
                if (!options['processing_results']['char_columns'].includes(_new_column_name)) {
                    options.processing_results.char_columns.push(_new_column_name);
                };
            }
            data = data;
        }
    });
    options.data = data;
    return rm_char_row_col(options);
}


/**
 * Remove column or row based on the threshold
 * Keep column if it contains number  > 70% (Remove rows)
 * Drop column if if contains number < 70%
 *  
 * @param {*} options 
 * @returns  
 */

const rm_char_row_col = function (options) {

    let data = options.data;
    let threshold = options.processing_selection.numeric_threshold;
    const columnNames = Object.keys(data[0]);
    const totalRows = data.length;

    if (typeof threshold != 'number' || isNaN(threshold)) {
        threshold = 0.7;
    }
    else if (threshold < 0 || threshold > 1) {
        threshold = 0.7;
    }

    for (const col of columnNames) {
        let numericCount = 0;

        // Count numeric values
        for (const row of data) {
            const value = row[col];
            if (!isNaN(parseFloat(value)) && isFinite(value)) {
                numericCount++;
            }
        }

        const numericRatio = numericCount / totalRows;

        if (numericRatio > threshold) {
            // Keep column, but remove rows where value is not numeric
            data = data.filter(row => {
                const isNumeric = !isNaN(parseFloat(row[col])) && isFinite(row[col]);
                if (!isNumeric) options.processing_results.deleted_rows++;
                return isNumeric;
            });
        } else {
            // Delete column
            for (const row of data) {
                delete row[col];
            }
            options.processing_results.char_columns.push(col);
        }
    }
    options.data = data;
    return rm_char_row(options);
}


/**
 * Remove row if  columns have char 
 * 
 * @param {*} options 
 * @returns 
 */
const rm_char_row = function (options) {

    let data = options.data;
    const string_row_check = [];
    for (let check_all_col = 0; check_all_col < data.length; check_all_col++) {
        if (!(Object.values(data[check_all_col]).every(x => (typeof (+x) === 'number' && !isNaN(+x))))) {
            string_row_check.push(check_all_col);
            options.processing_results.deleted_rows++
        }
    }
    if (string_row_check.length > 0) {
        data = data.filter((obj, index) => !string_row_check.includes(index));
    }
    options.data = data;
    return purge_constant.rm_const_col(options);
}


module.exports = {
    rm_char_col,
    rm_char_row
}