import os
import csv
import urllib.request
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

def get_wikitravel_link(query):
    print(query)
    #global link
    '''
    Takes a query (String) and returns the first url (String)
    '''
    query = query.replace(" ", "+")     # In case query has more than one word
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
    url = 'https://wikitravel.org/wiki/en/index.php?search=' + query + '&title=Special%3ASearch&profile=default&fulltext=1'

    req = Request(url=url, headers=headers)
    print("Reading " + url)
    html = urlopen(req).read()
    print("Read " + url)

    soup = BeautifulSoup(html, 'html.parser')
    for link in soup.findAll(attrs={'class':'mw-search-result-heading'}):    
        children = link.findChildren("a" , recursive=False)
        for child in children:
            #if got_it ==0:
            result = child['href']
            break
    return result


with open('todo_wikitravel.csv', 'r') as f:
    reader = csv.reader(f)
    todo_list = list(reader)
    for item in todo_list:
        query = item[1]        
        print('getting link')
        url = get_wikitravel_link(query)
        print('got' + url + '  Now using wget to get the files')
        #command = 'wget.exe -q --recursive --html-extension --page-requisites --convert-links http://www.wikitravel.com/' + url
        command = 'wget.exe -k -p -e robots=off -U mozilla -K -E -t 6 -w 5 --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=output https://www.wikitravel.com/' + url
        os.system(command)
        print('done and saved')
            
        
