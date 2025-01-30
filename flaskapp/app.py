from flask import Flask, render_template, request, jsonify, make_response

app = Flask(__name__)

students = [{
    "id": 1,
    "name": "ken",
    "age": 20
}]


@app.route("/")
def home():
    return "Hello, World!"


@app.route("/about")
def about():
    return render_template('about.html', students=students)


@app.route("/about", methods=["POST"])
def add_student():
    data = request.get_json()  # Get JSON data from the request body
    name = data.get('name')
    age = data.get('age')

    # Create a student dictionary from the request JSON
    student = {
        "id": len(students) + 1,
        "name": name,
        "age": age
    }

    # Append the student to the students list
    students.append(student)

    return make_response(jsonify({"message": "Student added successfully!", "student": student}), 201)


if __name__ == '__main__':
    app.run(debug=True)
