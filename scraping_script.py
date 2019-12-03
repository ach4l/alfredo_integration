import urllib.request
from bs4 import BeautifulSoup
from pytube import YouTube
import os
import os.path
from os import path

# Making the query

def youtube_scraper(query,userid):

    # If the userid folder already exists, then dont need to create one

    # All the files requested by a user will be stored in userid folder
    if not path.exists(str(userid)):
        os.mkdir(str(userid))

        
    query = query.replace(" ", "+")
    print(query)
    url = "http://m.youtube.com/results?search_query=" + query
    print(url)
    response = urllib.request.urlopen(url)
    print('opened')
    html = response.read()
    print('read')

    # Getting links and Saving the first
    soup = BeautifulSoup(html, 'html.parser')
    downloaded = 0
    for vid in soup.findAll(attrs={'class':'yt-uix-tile-link'}):
        url = 'https://m.youtube.com' + vid['href']
        
        video_name = vid['title']
        video_name = video_name.rstrip()
        
        if downloaded == 0:
            downloaded = 1  # Downloading only one for now
            
            yt = YouTube(url)
            #yt.title(video_name)
            stream = yt.streams.first()
            stream.download(str(userid)+ '/', filename=video_name)
            
            print('https://m.youtube.com' + vid['href'])
            print('Saved as')
    print('Done')

    return

# Reading the todo csv line by line

import csv

with open('todo.csv', 'r') as f:
    reader = csv.reader(f)
    todo_list = list(reader)
    for item in todo_list:
        if item[2] == 'youtube':
            youtube_scraper(item[3],item[0])

