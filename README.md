# data-preprocessing
A flexible JavaScript data preprocessing library for cleaning datasets. Features include removing constant and duplicate columns, filtering columns based on numeric content, and dropping highly correlated features with configurable thresholds—ideal for preparing data for analysis and machine learning. It provides easy-to-use functions for:

    ✅ Handling missing values (imputation or row/column removal)
    ✅ Removing duplicate records
    ✅ Detecting & dropping highly correlated columns
    ✅ Scaling and normalizing numerical data
    ✅ Encoding categorical variables

💡 Perfect for developers working with structured datasets in JavaScript/Node.js.

---

### 🔧 Preprocessing Configuration Options

The data preprocessing utility provides configurable options to clean and optimize your dataset before analysis or machine learning tasks. Below is a detailed explanation of each supported option:

---

#### ✅ `numeric_threshold` (default: `0.7`)

Specifies the **minimum percentage of numeric values required** for a column to be treated as a numeric feature.
Columns that do not meet this threshold will be considered non-numeric and may be excluded from numeric-only operations (like correlation analysis).

* **Type:** `number` (between 0 and 1)
* **Example:** If `numeric_threshold = 0.7`, a column must have at least 70% numeric entries to be retained as numeric.

---

#### ✅ `remove_constant_columns` (default: `true`)

Enables automatic removal of **constant columns** — i.e., columns where all values are the same or contain only one unique value.

* Such columns add no predictive power or variability and are usually safe to discard.
* **Recommended** for almost all preprocessing pipelines.

---

#### ✅ `remove_duplicate_columns` (default: `true`)

Enables removal of columns that are **exact duplicates** of each other.

* These columns are redundant and can inflate dimensionality without providing extra information.
* The utility detects and removes one copy from each duplicate group.

---

#### ✅ `remove_correlated_columns` (default: `true`)

Activates the detection and removal of **highly correlated features** (based on Pearson correlation).

* Helps reduce multicollinearity and model overfitting.
* Particularly useful when training models that assume feature independence (e.g., linear regression).

---

#### ✅ `correlation_coefficient_magnitude` (default: `0.8`)

Defines the **threshold for high correlation** between pairs of numeric columns.
If the **absolute value** of the Pearson correlation coefficient between two columns exceeds this threshold, one of them will be removed.

* **Type:** `number` (between `0` and `1`)
* **Example:** If `correlation_coefficient_magnitude = 0.8`, any pair of columns with correlation > `0.8` or < `-0.8` will be considered redundant.

---

### 🔄 Example Configuration

```js
preprocessDataset(data, {
  numeric_threshold: 0.7,
  remove_constant_columns: true,
  remove_duplicate_columns: true,
  remove_correlated_columns: true,
  correlation_coefficient_magnitude: 0.8
});
```

This setup will:

* Keep only numeric columns with ≥ 70% numeric values
* Drop constant and duplicate columns
* Drop one of each pair of columns that are ≥ 80% correlated
