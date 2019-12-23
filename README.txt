To Connect Raspberry Pi

- Name your wifi hotspot as rpi_hotspot_23
- The network password is maximus13

The device should automatically connect (See in the hotspot settings)

- ssh to the ip address shown in connected devices (Note : This changes everytime)
- Username - pi, password - raspberry

Voila, you should be able to develop!

To activate virtual environment for backend

$ source cacheon_backend/bin/activate


Great Source for creating a development environment

https://superuser.com/questions/1316300/how-to-sync-a-local-dir-to-server-using-git

Git commands :

git remote add origin https://pi@192.168.137.168
git remote set-url origin pi@192.168.137.168:~/cache_on_backend/sync_pi
git push --set-upstream origin master


For ALFREDO : (how to send requests to backend API)

# Task 1 - Add a new request to the backend

Sample data: 
data = {'user_id': '1', 'req_id':"1", 'type':'wikitravel', 'mode': '0', 'query': 'Pushkar'}

Post JSON to the following URL
url = <ip.address>:<port>/add_request

# Task 2 - Get the links to download all the files

Sample data remains the same. Only url changes.

Post JSON to the following URL
url = <ip.address>:<port>/send_results

ONLY FOR TEST : 
Wikitravel 0 - {query : "Valparaiso"}
Wikitravel 1 - {query : "Hyderabad"}
Youtube 1 - {query : "Gaand"}

Returns a json object (jsonify(files)) 

# Task 3 - Links to download the files

Just iterate through all the links gotten from Task 2.