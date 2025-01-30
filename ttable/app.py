from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World!"


@app.route('/process_excel', methods=['POST'])
def process_excel():
    try:
        # Parse the JSON request
        data = request.get_json()
        file_path = data.get('file_path')
        sheet_name = data.get('sheet_name')

        # Validate inputs
        if not file_path or not sheet_name:
            return jsonify({"error": "file_path and sheet_name are required"}), 400
        if not os.path.exists(file_path):
            return jsonify({"error": f"File not found: {file_path}"}), 404

        # Load the Excel file
        df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)

        # Initialize variables
        extracted_data = {}
        current_section = None
        header_row = None

        # Extract section title from sheet_name (letters before the underscore)
        section_prefix = sheet_name.split('_')[0]

        # Iterate through the rows of the DataFrame
        for index, row in df.iterrows():
            # Check if the row contains a section title (e.g., "BAC 1.1")
            if isinstance(row[0], str) and section_prefix in row[0]:
                current_section = row[0].strip()  # Save the section title
                extracted_data[current_section] = {
                    "header": None, "rows": []}  # Initialize section data
                continue

            # Check if the row contains the header
            if isinstance(row[0], str) and "DAY#" in row[0] and "DAY" in str(row[1]):
                header_row = row.tolist()  # Save the header row
                if current_section:
                    # Assign header to the current section
                    extracted_data[current_section]["header"] = header_row
                continue

            # If the row is below the header and belongs to a section, add it to the section
            if header_row and current_section:
                if not row.isnull().all():  # Ensure the row is not empty
                    extracted_data[current_section]["rows"].append(
                        row.tolist())

        # Return the extracted data as JSON
        return jsonify(extracted_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
