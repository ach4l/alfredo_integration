import os
import csv
import urllib.request
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re
from datetime import datetime
startTime = datetime.now()



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
        #print("matching class mw-search...")
        #print(link)    
        children = link.findChildren("a" , recursive=False)
        #print('children of that class')
        #print(children)
        for child in children:
            #print('each child')
            #print(child)
            #if got_it ==0:
            result = child['href']
            break
        break
    print(result)
    return result

def get_links_from_wikitravel_page(url):
    '''
    Takes a url and returns a list of urls in the page worth scraping further
    '''
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
    req = Request(url=url, headers=headers)
    html = urlopen(req).read() 
    print("here")
    soup = BeautifulSoup(html, 'html.parser')
    links = []
    for body in soup.findAll(attrs={'class':'mw-body-content', 'id':'bodyContent'}):
        for link in body.find_all("a",{'class':''}, href=re.compile("^/en/((?!File:|Wikitravel:|Category:|Special:).)*$")):
            links.append(link['href'])
    print(len(links))
    links = list(dict.fromkeys(links))
    print(links)
    print(len(links))
    return links

with open('todo_wikitravel.csv', 'r') as f:
    reader = csv.reader(f)
    todo_list = list(reader)
    for item in todo_list:
        query = item[1]        
        print('getting link')
        url = get_wikitravel_link(query)
        print('got' + url + '  Now using wget to get the files')
        #command = 'wget.exe -q --recursive --html-extension --page-requisites --convert-links http://www.wikitravel.com/' + url
        #regex = /^Mary/    /^http://www.wikitravel.com/en/ [a-zA-Z_()]
        # -A html,jpg,jpeg,png,css,icon,orig
        command = 'wget.exe -N -c -k -p -e robots=off -U mozilla -K -E -t 6 -w 0.1 --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=output5 https://www.wikitravel.org' + url
        os.system(command)
        print('wget done, now looking at level 2')
        main_page_url = 'https://www.wikitravel.org'+url
        links = get_links_from_wikitravel_page(main_page_url)
        for link in links:
            city = link.split('/')[-1]
            print(city)
            command = 'wget.exe -N -c -k -p -e robots=off -U mozilla -K -E -t 6 -w 0.1 -R "*.JPG,*.jpg,*.PNG,*.png,*.jpeg,*.JPEG" --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=output5 https://www.wikitravel.org' + link
            os.system(command)

        print('done and saved')

#do something

print("Total Runtime:")
print(datetime.now() - startTime)
            
        
