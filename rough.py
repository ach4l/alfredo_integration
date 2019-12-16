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

link = get_wikitravel_link('bilaspur')