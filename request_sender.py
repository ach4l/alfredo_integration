import requests
import json

data = {'req_id':"1_1"}
headers = {'content-type': 'application/json'}

url = "http://127.0.0.1:5000/transform"

r = requests.post(url = url, data = json.dumps(data), headers = headers )
print(r.text)