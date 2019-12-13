import requests
import json

data = {'userid':"First Chutiya", 'query':"Goa"}
headers = {'content-type': 'application/json'}

url = "http://127.0.0.1:5000/json-example"

r = requests.post(url = url, data = json.dumps(data), headers = headers )
print(r)