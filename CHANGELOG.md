# Changelog

## [1.1.0] - August 26, 2025

### Added
- New configuration option: `remove_character_columns` (default: `true`)
  - Enables automatic removal of columns containing character or alphanumeric values.
  - When disabled, character/alphanumeric columns are retained, but the following checks are skipped:
    - Removal of constant columns  
    - Removal of duplicate columns  
    - Removal of correlated columns  

### Changed
- Previously, character/alphanumeric columns were always removed during preprocessing.
- This behavior is now configurable via the `remove_character_columns` option. 


---

## [1.0.0] - August 4, 2025
### Added
- Core functionality for data preprocessing and validation:
  - Load datasets
  - Remove empty columns
  - Remove empty rows
  - Remove character/alphanumeric columns
  - Remove columns/rows based on configurable thresholds
  - Detect and handle duplicate columns
  - Identify constant columns
  - Perform basic data validation
  - Identify correlated columns
