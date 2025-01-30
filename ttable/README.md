## Flask Application to Process Excel KCA timetable Files

This Flask application provides an API endpoint to process Excel files and extract specific sections and rows based on the sheet name and content.

### Functionality

1. **Endpoint**: `/process_excel`

   - **Method**: `POST`
   - **Request Body**: JSON containing `file_path` and `sheet_name`
   - **Response**: JSON with extracted data or error message

2. **Process**:
   - Parses the JSON request to get `file_path` and `sheet_name`.
   - Validates the inputs.
   - Loads the specified Excel sheet.
   - Iterates through the rows to identify sections and headers.
   - Extracts rows under each section and organizes them into a structured JSON response.

### How to Test

1. **Setup**:

   - Ensure you have Python, Flask, and Pandas installed.
   - Save the provided code in a file, e.g., `app.py`.

2. **Run the Application**:

   ```bash
   python app.py
   ```

3. **Send a POST Request**:

   - Use a tool like `curl` or Postman to send a POST request to `http://127.0.0.1:5000/process_excel`.
   - Example request body:
     ```json
     {
       "file_path": "/path/to/your/excel/file.xlsx",
       "sheet_name": "Sheet1"
     }
     ```

4. **Check the Response**:
   - The response will contain the extracted data in JSON format or an error message if something went wrong.

### Example

**Request**:

```json
{
  "file_path": "/home/user/data.xlsx",
  "sheet_name": "BAC_1.1"
}
```

**Response**:

```json
{
  "BAC 1.1": {
     "header": ["DAY#", "DAY", ...],
     "rows": [
        [1, "Monday", ...],
        [2, "Tuesday", ...],
        ...
     ]
  }
}
```

This example demonstrates how the application extracts and organizes data from the specified Excel sheet.
