/**
 * 
 * @param {*} options 
 * @returns 
 */
const rm_correlated_cols = function (options) {

    let perf_corr_check = options.processing_selection.remove_correlated_columns;
    if (typeof perf_corr_check != 'boolean') {
        perf_corr_check = true;
    }

    if (perf_corr_check) {
        let data = options.data;
        let column_headers = Object.keys(data[0]);
        let correlation_val = options.processing_selection.correlation_coefficient_magnitude;

        if (correlation_val > 1 || correlation_val < -1 ) {
            correlation_val = 0.8;
        }
        let positive_correlation = correlation_val;
        let negative_correlation = -correlation_val;

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
        let corelated_columns = [];
        for (let i = 0; i < column_headers.length; i++) {
            for (let j = i + 1; j < column_headers.length; j++) {
                let first_col = column_headers[i];
                let sec_col = column_headers[j];

                let sum_first_col = 0;
                let sum_second_col = 0;
                let sum_first_second_col = 0;
                let square_sum_first_col = 0;
                let square_sum_second_col = 0;

                for (let index = 0; index < column_object[first_col].length; index++) {

                    //Ignore correlated column
                    if (!corelated_columns.includes(sec_col)) {
                        sum_first_col = sum_first_col + column_object[first_col][index];
                        sum_second_col = sum_second_col + column_object[sec_col][index];
                        sum_first_second_col = sum_first_second_col + column_object[first_col][index] * column_object[sec_col][index];
                        square_sum_first_col = square_sum_first_col + column_object[first_col][index] * column_object[first_col][index];
                        square_sum_second_col = square_sum_second_col + column_object[sec_col][index] * column_object[sec_col][index];
                    }
                }

                // Use formula for calculating correlation coefficient.
                const correlation = (column_object[first_col].length * sum_first_second_col - sum_first_col * sum_second_col) /
                    (Math.sqrt((column_object[first_col].length * square_sum_first_col -
                        sum_first_col * sum_first_col) *
                        (column_object[first_col].length * square_sum_second_col -
                            sum_second_col * sum_second_col)));

                /**
                 * Columns will be considered as correlated if correlation value is greater than 0.95 or less than -0.95
                 *  */
                if (correlation > positive_correlation || correlation < negative_correlation) {
                    options.processing_results.correlated_columns.push(sec_col);
                    corelated_columns.push(sec_col);

                    // delete correlated column
                    for (let del_col = 0; del_col < data.length; del_col++) {
                        delete data[del_col][sec_col];
                    }
                };
            };
        };
        options.data = data;
        return options
    }
    else {
        return options;
    }
}


module.exports = {
    rm_correlated_cols
}