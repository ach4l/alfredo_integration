from flask import Flask, make_response, request, render_template, send_file, abort, jsonify, send_from_directory
from flask import Response
import io
import csv
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_url_path='')
CORS(app, support_credentials=True)

@app.route('/<reqid>/<path>', methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def root(path, reqid):
    print('sending ' + path) 
    return app.send_static_file(reqid + '/' + path)

# # Let us see which works
# @app.route('/results/<reqid>/<path:path>')
# #@app.route('/results/<reqid>/<path>')
# def send_js(path,reqid):
#     return send_from_directory('results/'+reqid, path)




@app.route("/")
def hello():
    return render_template("main_page.html")

# Dummy form to get information 

#@app.route('/transform', methods=["GET","POST"])
# def transform_view():
#     #userid = request.form["userid"]
#     userid = request.args.get('userid')
#     print(userid)
#     return userid

# Getting a Post Request from the user to store queries in todo list
@app.route('/add_request', methods=["GET","POST"]) #GET requests will be blocked
@cross_origin(supports_credentials=True)
def read_request():
    req_data = request.get_json()
    user_id = str(req_data['user_id'])
    query = str(req_data['query'])
    
    with open('id_counter.csv', mode='r') as infile:
        # id_counter format - user_id : id_counter
        reader = csv.reader(infile)        
        id_counter_dict = {rows[0]:rows[1] for rows in reader}
    print(id_counter_dict)
    if user_id in id_counter_dict:
        print('here')
        print( id_counter_dict[user_id] )
        id_counter_dict[user_id] = str(int(id_counter_dict[user_id]) + 1)
        id_counter = int(id_counter_dict[user_id])
    else:
        print('here2')
        #print( id_counter_dict[user_id] )
        id_counter_dict[user_id] = 0
        id_counter = 0
    with open('id_counter.csv', 'w') as fw:
        for key in id_counter_dict.keys():
            fw.write("%s,%s\n"%(key,id_counter_dict[key]))


    #req_id = user_id + '_'  + str(req_data['req_id']) 
    req_id = user_id + '_'  + str(id_counter)
    source = str(req_data['type'])
    mode = str(req_data['mode'])

    

    ######## Youtube translation to backend format
    if source == 'Youtube':
        if mode == 'audio':
            source_mode = source + '_0'
        else:
            source_mode = source + '_1'
    
    ######## Wikitravel translatio to backend format
    if source == 'Wikitravel':
        source_mode = source + '_' + mode
            
    
    line = [user_id, req_id, source_mode, query]
    print('Writing this to todo.csv')
    print(line)                
    with open('todo.csv', 'a', newline='') as fw:
        writer = csv.writer(fw, delimiter=',')
        writer.writerow(line)
    print("Stored in todo")
    req_data['server_request_id'] = req_id
    print(type(req_data))
    return jsonify(req_data)



@app.route('/send_results', methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def transform_view():
    req_data=request.get_json()
    user_id = str(req_data['user_id'])

    

    req_id = str(req_data['server_request_id'])
    #req_id = user_id + '_'  + str(req_data['req_id'])
    if req_data['query'] == 'Valparaiso':
        req_id = 'w_0' 
    if req_data['query'] == 'Hyderabad':
        req_id = 'w_1'
    if req_data['query'] == 'Gaand':
        req_id = 'yt_1'
    UPLOAD_DIRECTORY = 'static/'+req_id
    print('looking for your request in the following directory')
    print(UPLOAD_DIRECTORY)
    if not os.path.exists(UPLOAD_DIRECTORY):
        # Create response
        message = {"server_request_id":req_id,"status":"Downloading"}
        #return Response(jsonify(message), status=200, mimetype='application/json')
        return jsonify(message), 200
        #return "Wait till you get it!"
    else:        
        files = []
        path = 'static/' + str(req_id) + '/'
        print(path)
        #ip_address = '192.168.43.31' 
        import socket    
        hostname = socket.gethostname()    
        IPAddr = socket.gethostbyname(hostname)
        print('IP Address :')
        print(IPAddr) 
        for i in os.listdir(path):
            files.append(i)        
        full_path_array = ['http://' + IPAddr + ':5000/' + str(req_id) + '/' + s for s in files]
        response_frontend = {}
        response_frontend['status'] = "OK"
        response_frontend['links'] = full_path_array
        
        # Add the server address (MAKE IT AGNOSTIC OF IP ADDRESS)
        return jsonify(response_frontend)

@app.route('/backup/<userid>', methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def give_backup(userid):
    req_data=request.get_json()
    directory_to_look = 'static/backup/' + userid + '.json'
    import json
    if request.method == 'GET':
        with open(directory_to_look, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        return (jsonify(json_data))
    if request.method == 'POST':
        print()
        with open(directory_to_look, 'w+', encoding='utf-8') as f:
            json.dump(req_data, f)
        message = {"status":"OK"}
        return jsonify(message), 200
    
    




if __name__ == "__main__":
    app.run(host= '0.0.0.0')