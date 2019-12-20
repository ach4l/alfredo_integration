import requests
import json

data = {'user_id': '1', 'req_id':"1", 'type':'Wikitravel', 'mode': '0', 'query': 'Rio de Janeiro'}

headers = {'content-type': 'application/json'}

url = "http://127.0.0.1:5000/add_request"

r = requests.post(url = url, data = json.dumps(data), headers = headers )
print(r.text)