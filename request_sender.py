import requests
import json

data = {'user_id': '1','server_request_id' : "yt_1", 'req_id':"1", 'type':'Wikitravel', 'mode': '0', 'query': 'DarjeelingS'}

headers = {'content-type': 'application/json'}

url = "http://192.168.43.31:5000/send_results"

r = requests.post(url = url, data = json.dumps(data), headers = headers )
print(r.text)