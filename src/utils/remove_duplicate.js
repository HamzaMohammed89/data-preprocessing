const purge_corr = require('./remove_correlated');

/**
 * 
 * @param {*} options 
 * @returns 
 */
const rm_dup_cols = function (options) {

    let del_dup_col = options.processing_selection.remove_duplicate_columns;
    if (typeof del_dup_col != 'boolean') {
        del_dup_col = true;
    }

    if (del_dup_col) {
        let data = options.data;
        let column_headers = Object.keys(data[0]);

        //get column objects with values
        const column_object = {};
        let column_name = Object.keys(data[0]);
        for (let col = 0; col < column_name.length; col++) {
            const col_values = [];
            const new_col_name = column_name[col];
            for (let col_array = 0; col_array < data.length; col_array++) {
                if (data[col_array] !== undefined && data[col_array][new_col_name] !== undefined) {
                    if (col_values.length <= data.length - 1) {
                        col_values.push(data[col_array][new_col_name]);
                    }
                    column_object[new_col_name] = col_values;
                }
            }
        }

        // find column permutations and combonations for comparision
        for (let i = 0; i < column_headers.length; i++) {
            for (let j = i + 1; j < column_headers.length; j++) {
                let first_col = column_headers[i];
                let sec_col = column_headers[j];

                if (column_object[first_col].every((val, index) => val === column_object[sec_col][index])) {
                    options.processing_results.duplicate_columns.push(sec_col);

                    //delete duplicate object
                    for (let del_col = 0; del_col < data.length; del_col++) {
                        delete data[del_col][sec_col];
                    }
                }
            }
        }
        options.data = data;
        return purge_corr.rm_correlated_cols(options);
    }
    else {
        return purge_corr.rm_correlated_cols(options);
    }
}

module.exports = {
    rm_dup_cols
}