import urllib.request
from bs4 import BeautifulSoup
from pytube import YouTube 

# Making the query
query = 'Butta Gandu'
query = query.replace(" ", "+")
url = "http://m.youtube.com/results?search_query=" + query
response = urllib.request.urlopen(url)
html = response.read()

# Getting links and Saving the first
soup = BeautifulSoup(html, 'html.parser')
downloaded = 0
for vid in soup.findAll(attrs={'class':'yt-uix-tile-link'}):
    url = 'https://m.youtube.com' + vid['href']
    if downloaded == 0:
        downloaded = 1
        
        yt = YouTube(url)
        #yt.set_filename(vid.contents)
        stream = yt.streams.first()
        stream.download()
        
        print('https://m.youtube.com' + vid['href'])
        print('Saved as')
print('Done')
