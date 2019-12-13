from flask import Flask, make_response, request, render_template, send_file, abort, jsonify, send_from_directory
import io
import csv
import os

app = Flask(__name__)

#@app.route('/transform', methods=["GET","POST"])
# def transform_view():
#     #userid = request.form["userid"]
#     userid = request.args.get('userid')
#     print(userid)
#     return userid

# Getting a Post Request from the user to store queries in todo list
@app.route('/json-example', methods=["GET","POST"]) #GET requests will be blocked
def read_request():
    req_data = request.get_json()
    line = [req_data['userid'], req_data['query']]
    print(line)                
    with open('todo_wikitravel.csv', 'a', newline='') as fw:
        writer = csv.writer(fw, delimiter=',')
        writer.writerow(line)
    print("Stored in todo")
    return '200 Everything went fine'


if __name__ == "__main__":
    app.run()