# Detailed Documentation

This document provides a complete breakdown of the technical aspects of the `project12` and `project31` repositories, including backend APIs, frontend components, and configuration details.

---

## Table of Contents
1. [Overview](#overview)
2. [Backend Details](#backend)
3. [Frontend Details](#frontend)
4. [Logs and Outputs](#logs-and-outputs)
5. [FAQs](#faqs)

---

## Overview

**Purpose**: 
- The project processes CSV data on the backend and serves it through APIs for frontend visualization.

**Key Features**:
- Backend API to parse and transform CSV data.
- Frontend with dropdown selectors and interactive charts for data visualization.
- Logging for runtime events and debugging.

---

## Backend

### Key Files
1. **`constants/csvColumns.js`**: Defines expected CSV columns (`DATE`, `PORT_NAME`, `UTILIZATION`).
2. **`data` folder**: Stores raw CSV files used for testing and processing.
3. **`middleware/errorHandler.js`**: Ensures consistent API error handling.
4. **`utils`**:
   - `csvParser.js`: Converts CSV to JSON objects.
   - `dataTransformer.js`: Formats parsed data for charts.

### API Endpoints
- **`GET /api/files`**: Returns a list of available CSV files.
- **`GET /api/data/:filename`**: Processes and returns formatted data for the specified file.

---

## Frontend

### Components
- **`FileSelector.tsx`**: Dropdown for selecting a CSV file.
- **`PortSelector.tsx`**: Dropdown for selecting a port from the CSV.
- **`UtilizationChart.tsx`**: Renders a chart using Chart.js.
- **`LoadingSpinner.tsx`**: Displays a spinner during data loading.

### Data Flow
1. User selects a file → Backend fetches available ports.
2. User selects a port → Backend fetches utilization data for visualization.

---

## Logs and Outputs

- **Logs**: Backend runtime events are logged in `app.log`.
- **Outputs**: The application displays charts for visualizing port utilization.

---

## FAQs

1. **What happens if a CSV file is malformed?**  
   The error is logged in `app.log`.

---

For additional questions, refer to the [Short README](./README.md).
