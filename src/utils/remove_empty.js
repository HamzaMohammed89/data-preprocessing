'use strict';
const purge_char = require('./remove_chars');

const process_data_cleansing = function (options) {
  return drop_empty_row(options)
}


/**
 * Drop row(s) if all columns have missing data
 * @param {*} options 
 * @returns 
 */
const drop_empty_row = function (options) {
  let data = options.data;
  for (let check_all_cols = 0; check_all_cols < data.length; check_all_cols++) {
    if (Object.values(data[check_all_cols]).every(x => x === null || x === '')) {
      options.processing_results.deleted_rows++
      data.splice(check_all_cols, 1);
    }
  }
  options.data = data;
  return drop_empty_col(options);
};


/**
 * Drop column(s) if entire row have missing values
 * @param {*} options 
 * @returns 
 */
const drop_empty_col = function (options) {
  let data = options.data;
  let column_name = Object.keys(data[0]);
  column_name.forEach(_new_column_name => {
    let check_empty_column = [];
    for (let col_check = 0; col_check < data.length; col_check++) {
      if (data[col_check][_new_column_name].length !== 0) {
        check_empty_column.push(data[col_check][_new_column_name]);

      }
    }
    if ((check_empty_column.length === 0)) {
      // Entire column is empty, peforming column deletion
      for (let empty_col = 0; empty_col < data.length; empty_col++) {

        delete data[empty_col][_new_column_name];
        if (!options['processing_results']['empty_columns'].includes(_new_column_name)) {
          options.processing_results.empty_columns.push(_new_column_name);
        }
      }
    }
  });
  options.data = data;
  return drop_single_row(options);
};


/**
 * Drop entire row if single column is empty
 * @param {*} options 
 * @returns  
 */
const drop_single_row = function (options) {
  let data = options.data;
  const missing_columns_in_row = [];
  for (let check_each_row = 0; check_each_row < data.length; check_each_row++) {
    if (!Object.values(data[check_each_row]).every((v) => v['length'] !== 0)) {
      missing_columns_in_row.push(check_each_row);
      options.processing_results.deleted_rows++

    }
  }
  data = data.filter((obj, index) => !missing_columns_in_row.includes(index));
  options.data = data;
  return purge_char.rm_char_col(options);
}


module.exports = {
  process_data_cleansing,
  drop_empty_row,
  drop_single_row
}