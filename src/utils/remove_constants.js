'use strict';
const purge_dup = require("./remove_duplicate");

/**
 * 
 * @param {*} options 
 * @returns 
 */
const rm_const_col = function (options) {
    let del_const_col = options.processing_selection.remove_constant_columns;

    if (del_const_col) {
        let data = options.data;
        let column_name = Object.keys(data[0]);

        column_name.forEach(_new_column_name => {
            const check_const_column = [];
            for (let const_col = 0; const_col < data.length; const_col++) {
                if ((data[const_col][_new_column_name] !== undefined)) {
                    check_const_column.push(data[const_col][_new_column_name]);
                }
            }
            if (check_const_column.every((val, const_col, arr) => val === arr[0])) {
                // column is const, peforming column deletion
                for (let const_col_del = 0; const_col_del < data.length; const_col_del++) {
                    delete data[const_col_del][_new_column_name];
                    if (!options['processing_results']['constant_columns'].includes(_new_column_name)) {
                        options.processing_results.constant_columns.push(_new_column_name);
                    }
                }
            }
        });
        options.data = data;
        return purge_dup.rm_dup_cols(options);
    }
    else {
        return purge_dup.rm_dup_cols(options);
    }
}


module.exports = {
    rm_const_col
}