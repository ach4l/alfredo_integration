from scrapers import wikitravel_scraper, youtube_scraper, weather_scraper, google_scraper
import csv
import time


time_taken_list = []
with open('todo.csv', 'r') as f:    
    reader = csv.reader(f)
    todo_list = list(reader)
    for item in todo_list:
        start = time.time()
        print(item)
        # item[2] corresponds to what scraper to be used and the mode
        # item[3] is the query related to the service
        # item[1] is the request id

        #### Wikitravel 
        if item[2] == 'wikitravel_0':
            wikitravel_scraper(item[3], item[1], 0)
        if item[2] == 'wikitravel_1':
            wikitravel_scraper(item[3], item[1], 1)

        #### Youtube
        if item[2] == 'youtube_0':
            youtube_scraper(item[3], item[1], 0)
        if item[2] == 'youtube_1':
            youtube_scraper(item[3], item[1], 1)

        #### Weather
        if item[2] == 'weather':
            weather_scraper(item[3], item[1])

        #### Google
        if item[2] == 'google':
            google_scraper(item[3], item[1])

        time_taken_list.append(time.time() - start)
print("Here is the time taken for each item")
print(time_taken_list)
        