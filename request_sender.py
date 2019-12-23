import requests
import json

data = {'user_id': '1', 'req_id':"1", 'type':'Wikitravel', 'mode': '0', 'query': 'DarjeelingS'}

headers = {'content-type': 'application/json'}

url = "http://192.168.137.168:5000/add_request"

r = requests.post(url = url, data = json.dumps(data), headers = headers )
print(r.text)