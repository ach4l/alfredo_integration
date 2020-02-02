import requests
import json

#data = {'user_id': '1','server_request_id' : "w_1", 'req_id':"1", 'type':'Wikitravel', 'mode': '0', 'query': 'Valparaiso'}

headers = {'content-type': 'application/json'}

url = "http://127.0.0.1:5000/results?query=Byebye"


r = requests.get(url = url)
#r = requests.get(url = url, data = json.dumps(data), headers = headers )
print(r.text)