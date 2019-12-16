import os
import csv
import urllib.request
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re
from zipfile import ZipFile

######### General utility functions ###########

def zip_a_directory(filename,directory_read,directory_write):
    '''
    Takes a directory (read) -> zips the directory (filename.zip) -> stores it in a directory (write)

    Tested and works - zip_a_directory('1_1.zip','output5', 'output' )
    '''
    print('Function running : get_wikitravel_link')
    print('Directory being zipped: ' + directory_read)
    with ZipFile(directory_write + '/' + filename, 'w') as zipObj:
        # Iterate over all the files in directory
        for folderName, subfolders, filenames in os.walk(directory_read):
            for filename in filenames:
                #create complete filepath of file in directory
                filePath = os.path.join(folderName, filename)
                # Add file to zip
                zipObj.write(filePath)
    print('Zipped to ' + directory_write + '/' + filename)
    return



###########################   WIKITRAVEL   ############################

def get_wikitravel_link(query):    
    
    '''
    Takes a Wiki travel query (String) and returns the first url (String) given by wikitravel

    '''
    print('Function running : get_wikitravel_link')
    print('User Query is: ' + query)
    query = query.replace(" ", "+")     # In case query has more than one word
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
    url = 'https://wikitravel.org/wiki/en/index.php?search=' + query + '&title=Special%3ASearch&profile=default&fulltext=1'
    req = Request(url=url, headers=headers)    
    html = urlopen(req).read()   

    # Getting only the top result after parsing the response
    soup = BeautifulSoup(html, 'html.parser')
    for link in soup.findAll(attrs={'class':'mw-search-result-heading'}):           
        children = link.findChildren("a" , recursive=False)        
        for child in children:            
            result = child['href']
            break
        break
    print(result)
    return result

def get_links_from_wikitravel_page(url):
    '''
    Takes a url of a wiki-travel page and returns a list of urls in the page worth scraping further
    '''
    print('Function running : get_links_from_wikitravel_page')
    print('Main page url is: ' + url)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
    req = Request(url=url, headers=headers)
    html = urlopen(req).read()    
    soup = BeautifulSoup(html, 'html.parser')
    links = []
    for body in soup.findAll(attrs={'class':'mw-body-content', 'id':'bodyContent'}):
        for link in body.find_all("a",{'class':''}, href=re.compile("^/en/((?!File:|Wikitravel:|Category:|Special:).)*$")):
            links.append(link['href'])
    #print(len(links))
    links = list(dict.fromkeys(links))
    #print(links)
    print('Found ' + str(len(links)) + ' links to follow')
    return links

def wikitravel_scraper(query, request_id, level):
    '''
    takes as input a query and saves it in the response folder with title as request id

    TO DO - change the main page html to redirect to the lower level htmls
    '''
    url = get_wikitravel_link(query)        
    command = 'wget.exe -N -c -k -p -e robots=off -U mozilla -K -E -t 6 -w 0.1 --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=temp_output https://www.wikitravel.org' + url
    os.system(command)
    if level == 1:
        print('wget done, now looking at level 2')
        main_page_url = 'https://www.wikitravel.org'+url
        links = get_links_from_wikitravel_page(main_page_url)
        for link in links:
            city = link.split('/')[-1]
            print(city)
            command = 'wget.exe -N -c -k -p -e robots=off -U mozilla -K -E -t 6 -w 0.1 -R "*.JPG,*.jpg,*.PNG,*.png,*.jpeg,*.JPEG" --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=temp_output https://www.wikitravel.org' + link
            os.system(command)
    zip_a_directory(str(request_id)+'.zip','temp_output', 'results')
    shutil.rmtree('temp_outptut', ignore_errors=False, onerror=None)
    print('done and saved at results/' + str(request_id) + '.zip')
    return

############################# Youtube Scraper ##############################



#############################  Google Scraper  ##############################


############################# Weather Scraper  ##############################

