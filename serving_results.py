  
from flask import Flask, make_response, request, render_template, send_file, abort, jsonify, send_from_directory
import io
import csv
import os



app = Flask(__name__)

@app.route("/")

def hello():
    return render_template("main_page.html")

@app.route('/transform', methods=["GET","POST"])
def transform_view():
    req_data=request.get_json()
    req_id = req_data['req_id']
    UPLOAD_DIRECTORY = 'results/'+req_id
    if not os.path.exists(UPLOAD_DIRECTORY):
        return "Wait till you get it!"
    else:        
        files = []
        path = 'results/'
        for i in os.listdir(path):
            if os.path.isfile(os.path.join(path,i)) and req_id in i:
                files.append(i)
        return send_file(path + files[0])   
    
    # return send_file('1/a.mp4')


    

    

if __name__ == "__main__":
    app.run()