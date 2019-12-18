print('hello')
import urllib.request
from bs4 import BeautifulSoup


from urllib.request import Request, urlopen

def get_wikitravel_link(query):
    '''
    Takes a query (String) and returns the first url (String)
    '''
    query = query.replace(" ", "+")     # In case query has more than one word
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
    url = 'http://wikitravel.org/wiki/en/index.php?search=' + query + '&title=Special%3ASearch&profile=default&fulltext=1'

    req = Request(url=url, headers=headers)
    print("Reading " + url)
    html = urlopen(req).read() 

    soup = BeautifulSoup(html, 'html.parser')
    for link in soup.findAll(attrs={'class':'mw-search-result-heading'}):    
        children = link.findChildren("a" , recursive=False)
        for child in children:
            #if got_it ==0:
            link = child['href']
            break
    print('http://www.wikitravel.com'+link)
    return link

from urllib.request import Request, urlopen
url =  'https://railways.makemytrip.com/listing?date=20191220&srcStn=NDLS&srcCity=Delhi&destStn=ASR&destCity=Amritsar&classCode='
#response = urllib.request.urlopen(url)
#html = response.read()

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
req = Request(url=url, headers=headers)
html = urlopen(req).read() 

# from requests_html import HTMLSession

# session = HTMLSession()
# r = session.get(url=url, headers = headers)
# print(r.html.render())

from urllib.request import Request, urlopen
import pandas as pd
url =  'https://railways.makemytrip.com/listing?date=20191220&srcStn=NDLS&srcCity=Delhi&destStn=ASR&destCity=Amritsar&classCode='
#response = urllib.request.urlopen(url)
#html = response.read()
url = 'https://www.cleartrip.com/trains/results?from_station=NDLS&to_station=ASR&class=3A&date=21-1-2020&adults=1&children=0&male_seniors=0&female_seniors=0'

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
req = Request(url=url, headers=headers)
html = urlopen(req).read() 

tables = pd.read_html(html)