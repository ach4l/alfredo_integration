import requests
import json

data = {'user_id': '1', 'req_id':"1", 'type':'wikitravel', 'mode': '0', 'query': 'Pushkar'}
headers = {'content-type': 'application/json'}

url = "http://127.0.0.1:5000/response"

r = requests.post(url = url, data = json.dumps(data), headers = headers )
print(r.text)