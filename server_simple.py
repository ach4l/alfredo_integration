from flask import url_for, Flask, make_response, redirect, request, render_template, send_file, abort, jsonify, send_from_directory
import io
import csv
import os



app = Flask(__name__,static_folder = "",      static_url_path='')

@app.route('/<user_id>/<request_no>', methods=["GET","POST"])
def root(user_id,request_no):
    filename = str(user_id)+'_'+str(request_no) + '.mp4'
    return send_from_directory("",filename, as_attachment=True)
    # try:
    #     app.send_static_file(filename)
    #     redirect_url = '#/'+str(user_id)+ '/' + str(int(request_no)+1)
    #     print("Redirect Url : " +redirect_url)
    #     return jsonify({"Message":"Got your file?"})
    # except:
    #     return jsonify({"Message":"File not there"})
    #     #return redirect(redirect_url)
    # #except:
    #     #return jsonify({"Message":"No More files"})

@app.route("/")
def hello():
    return render_template("landing_page.html")

@app.route('/<service>', methods=["GET","POST"])
def transform_view(service):
    if request.method=="GET":
        return render_template("main_page.html", service = service)
    else:


        print("Service is " + service)
        userid = request.form["userid"]
        print("Got user id")


        with open('todo_simple.csv', 'a', newline='') as fw:
            writer = csv.writer(fw, delimiter=',') 

            #  Currently maximum 4 requests per person. 
            for i in range(5):
                requestnumber = "request"+str(i)         
                
                if request.form[requestnumber]:                
                    line = [userid, userid + '_' + str(i), service ,  request.form[requestnumber]]
                    writer.writerow(line)   
            
            # for item in todo_list:
            #     if item[2] == 'youtube':
            #         youtube_scraper(item[3],item[0])

        # Uncommet from here
        
        # UPLOAD_DIRECTORY = userid
        # if not os.path.exists(UPLOAD_DIRECTORY):
        #     return "Wait till you get it!"
        # files = []
        # for filename in os.listdir(UPLOAD_DIRECTORY):
        #     path = os.path.join(UPLOAD_DIRECTORY, filename)
        #     if os.path.isfile(path):
        #         files.append(filename)
        ########

        #for i in range(len(files)):
        #    return send_from_directory(UPLOAD_DIRECTORY, files[i], as_attachment=True)
        #return jsonify(files)
        
        # return send_file('1/a.mp4')
    return jsonify({"Message": "All Saved"})


@app.route('/get_results', methods=["GET","POST"])
def send_results():
    url1= url_for('root', user_id=1, request_no = 0)
    #results += [each for each in os.listdir("") if each.endswith('.mp4')]
    return render_template("results.html", url1 = url1)



    


if __name__ == "__main__":
    app.run(host= '0.0.0.0')