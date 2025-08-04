const { processdataset } = require('../src/index');

let dataset = 'dataset file path';

const result = processdataset({
        dataset, 
        numeric_threshold :0.7, 
        remove_constant_columns: true, 
        remove_duplicate_columns: true, 
        remove_correlated_columns: true, 
        correlation_coefficient_magnitude: 0.8
});

console.log("✅ Cleaned Dataset:", result.data);
console.log("📊 Processing Results:", result.processing_results);
console.log("⚙️ Processing Selection:", result.processing_selection);
