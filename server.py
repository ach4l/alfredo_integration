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
    userid = request.form["userid"]

    

    with open('todo.csv', 'a', newline='') as fw:
        writer = csv.writer(fw, delimiter=',')  
        for i in range(4):
            requestnumber = "request"+str(i)
            if request.form[requestnumber]:
                line = [userid, userid + '_1', 'youtube' ,  request.form[requestnumber]]
                writer.writerow(line)   
        
        # for item in todo_list:
        #     if item[2] == 'youtube':
        #         youtube_scraper(item[3],item[0])

    
    
    UPLOAD_DIRECTORY = userid
    if not os.path.exists(UPLOAD_DIRECTORY):
        return "Wait till you get it!"
    files = []
    for filename in os.listdir(UPLOAD_DIRECTORY):
        path = os.path.join(UPLOAD_DIRECTORY, filename)
        if os.path.isfile(path):
            files.append(filename)
    #for i in range(len(files)):
    #    return send_from_directory(UPLOAD_DIRECTORY, files[i], as_attachment=True)
    return jsonify(files)
    
    # return send_file('1/a.mp4')


    

    

if __name__ == "__main__":
    app.run()