from flask import Flask, request

app = Flask(__name__)

@app.route("/")
@app.route('/results')
def data():
    # here we want to get the value of user (i.e. ?user=some-value)
    query = request.args.get('query')
    print(query)
    return "Hello"


if __name__ == "__main__":
    app.run(host= '0.0.0.0')