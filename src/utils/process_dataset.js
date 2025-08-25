'use strict';

const dataset_to_json = require('convert-csv-to-json');
const data_cleansing = require('./remove_empty');

const processdataset = function ({ dataset, numeric_threshold = 0.7, remove_character_columns = false, remove_constant_columns = true, remove_duplicate_columns = true, remove_correlated_columns = true, correlation_coefficient_magnitude = 0.8 }) {

    let options = {
        processing_results: {
            deleted_rows: 0,
            empty_columns: [],
            char_columns: [],
            constant_columns: [],
            duplicate_columns: [],
            correlated_columns: []
        },
        processing_selection: {
            numeric_threshold: numeric_threshold,
            remove_character_columns: remove_character_columns,
            remove_constant_columns: remove_constant_columns,
            remove_duplicate_columns: remove_duplicate_columns,
            remove_correlated_columns: remove_correlated_columns,
            correlation_coefficient_magnitude: correlation_coefficient_magnitude
        }
    }

    let data = dataset_to_json.fieldDelimiter(',')
        .formatValueByType()
        .parseSubArray("*", ',')
        .supportQuotedField(true)
        .getJsonFromCsv(dataset);
    options.data = data;
    return data_cleansing.process_data_cleansing(options);
}


module.exports = {
    processdataset
}