import os
import csv
import urllib.request
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re
from zipfile import ZipFile
from pytube import YouTube
from os import path
import shutil # To remove temp_directory
import json
import requests
from googlesearch import search
import codecs


######### General utility functions ###########

def zip_a_directory(filename,directory_read,directory_write):
    '''
    Takes a directory (read) -> zips the directory (filename.zip) -> stores it in a directory (write)

    Tested and works - zip_a_directory('1_1.zip','output5', 'output' )
    '''
    print('Function running : zip a directory')
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



###########################   Wikitravel Scraper   ############################

def get_wikitravel_link(query):    
    
    '''
    Takes a Wiki travel query (String) and returns the first url (String) given by wikitravel

    Tested and works get_wikitravel_link('hampi') -> /en/hampi

    '''
    print('Function running : get_wikitravel_link')
    print('User Query is: ' + query)
    query = query.replace(" ", "+")     # In case query has more than one word
    pattern = '[0-9]'                   # In case the user query has a number
    query = re.sub(pattern, '', query)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' }  # I'm a fucking pirate
    url = 'https://wikitravel.org/wiki/en/index.php?search=' + query + '&title=Special%3ASearch&profile=default&fulltext=1'
    req = Request(url=url, headers=headers) 
    html = urlopen(req).read()   
    print(html) 

    # Getting only the top result after parsing the response
    soup = BeautifulSoup(html, 'html.parser')
    for link in soup.findAll(attrs={'class':'mw-search-result-heading'}):  
        print('LINK')
        print(link)         
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
    # Getting only the links found in the Body, and some dirty regex hack
    for body in soup.findAll(attrs={'class':'mw-body-content', 'id':'bodyContent'}):
        for link in body.find_all("a",{'class':''}, href=re.compile("^/en/((?!File:|Wikitravel:|Category:|Special:).)*$")):
            links.append(link['href'])
    
    links = list(dict.fromkeys(links))    
    print('Found ' + str(len(links)) + ' links to follow')
    return links

def wikitravel_scraper(query, request_id, level):
    '''
    takes as input a query, scraps and saves it in the response folder with title as request id

    tested and works - wikitravel_scraper('Hampi', '1_1', 0)

    TO DO - change the main page html to redirect to the lower level htmls
    '''
    url = get_wikitravel_link(query) 

    #windows 
     #   command = 'wget.exe -q -N -c -k -p -e robots=off -U mozilla -K -E -t 6 --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=static/'+ request_id +' https://www.wikitravel.org' + url

    wget_url = url.replace("(", "\(")
    wget_url = wget_url.replace(")", "\)")
    command = 'wget -q -N -c -k -p -e robots=off -U mozilla -K -E -t 6 --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=static/'+ request_id +' https://www.wikitravel.org' + wget_url
    os.system(command)
    if level == 1:
        print('wget done, now looking at level 2')
        main_page_url = 'https://www.wikitravel.org'+url
        links = get_links_from_wikitravel_page(main_page_url)
        for link in links:
            city = link.split('/')[-1]
            print(city)
            command = 'wget -q -N -c -k -p -e robots=off -U mozilla -K -E -t 6 -R "*.JPG,*.jpg,*.PNG,*.png,*.jpeg,*.JPEG" --no-check-certificate --span-hosts --convert-links --no-directories --directory-prefix=static/'+ request_id +' https://www.wikitravel.org' + link
            os.system(command)
        transform_html('static/'+request_id+'/'+url.split('/')[-1] + '.html',links,request_id)   
    #zip_a_directory(str(request_id)+'.zip','temp_output', 'results')
    #shutil.rmtree('temp_output', ignore_errors=False, onerror=None)
    print('done and saved at results/' + str(request_id) + '.zip')
    return

def transform_html(filename,links,request_id):
    '''
    reads an html file and modifies the links and saves it in another html file called index.html

    Current function specific for wikitravel

    Tested and worked : transform_html('output5/Hampi.html',['/en/Hospet'])
    '''

    # TO DO - replace with appropriate content
    print('here')
    with codecs.open(filename, 'r', encoding="utf8") as f:
        soup = BeautifulSoup(f, 'html.parser')
        
        print('here2')
        
        content = f.read()
        print(content)
    for link in links:
        city = link.split('/')[-1]
        html_page = city + '.html'
        
        link = 'https://wikitravel.org' + link
        print('Replacing all ' + link + ' with ' + html_page)
        #content = re.sub("(<a [^>]*href\s*=\s*['\"])(' + ')?/?", "\\1myfile/sub0/0/", response)
        #content = content.replace(link, html_page)
        for a in soup.findAll('a', attrs = {'href':link}):
            print(a)
            a['href'] = a['href'].replace(link, html_page)
        result = str(soup)

        content = content.replace(link, html_page)
        print('here4')
    print(content)
    with codecs.open('static/' + request_id + '/request_index.html', 'w', encoding="utf8") as fw:
        fw.write(result)
    print('Linking of various pages done')
#print(content)


#print(content)
    


############################# Youtube Scraper ##############################

def youtube_scraper(query,request_id, aud_or_vid):
    '''
    takes as input a query and saves it in the response folder with title as request id
    '''        
    os.mkdir('static/'+request_id)
    query = query.replace(" ", "+")
    print(query)
    url = "http://m.youtube.com/results?search_query=" + query
    print(url)
    response = urllib.request.urlopen(url)
    print('opened')
    html = response.read()
    print('read and got the video link to download')

    # Getting links and Saving the first
    soup = BeautifulSoup(html, 'html.parser')
    downloaded = 0
    for vid in soup.findAll(attrs={'class':'yt-uix-tile-link'}):
        url = 'https://www.youtube.com' + vid['href']
        
        video_name = vid['title']
        video_name = video_name.rstrip()
        
        if downloaded == 0:
            downloaded = 1  # Downloading only one for now
            print(url)
            yt = YouTube(url)
            #yt.title(video_name)
            # If user wants Only AUDIO
            #yt.streams.all()
            if aud_or_vid == 0:
                print("Getting Audio")
                stream = yt.streams.filter(only_audio=True).first()
            else:
                print("Getting the lowest pososible video resolution")
                stream = yt.streams.filter(progressive=True).order_by('resolution').desc().last()
                
            stream.download('static/'+request_id + '/', filename=request_id)
            
            print('https://m.youtube.com' + vid['href'])
            print('Saved as')
    print('Done')

    return


#############################  Google Scraper  ##############################

def google_top_10 (query):    
    # Takes a query and returns a list of links
    
    links = []
    for j in search(query, tld="co.in",stop=10):
        links.append(j)
        print(j)   
    
    return links

def google_scraper(query,request_id):
    '''
    takes as input a query and saves it in the results folder with title as request_id.txt

    Tested and works : google_scrapper('Timeless tales', '2_9')

    '''
    links = google_top_10(query)
    link = links[0]    
    command = 'wget -N -c -q -k -p -e robots=off -U mozilla -K -E -t 6 --no-check-certificate --span-hosts --convert-links -A "*.html,*.css,*.HTML.*.CSS,*.JPG,*.jpg,*.PNG,*.png,*.jpeg,*.JPEG, *.SVG, *.svg" --no-directories --directory-prefix=static/' + request_id + ' '+ link
    os.system(command)
    #zip_a_directory(str(request_id)+'.zip','temp_output/', 'results')
    #shutil.rmtree('temp_output', ignore_errors=False, onerror=None)
    print('done and saved at results/' + str(request_id) + '.zip')
    return


    


############################# Weather Scraper  ##############################

def weather_scraper(userlat_long, request_id):
    '''
    takes user lat_long and saves the json in a txt file in results
    using: https://openweathermap.org/forecast5

    Tested and works :  weather_scraper('32.2475_76.3257', '4_3')
    '''
    api_key = '02d96f2375c5268afa56c3b6ae8b2593'
    # base_url variable to store url 
    base_url = 'http://api.openweathermap.org/data/2.5/forecast?'

    # parsing user latitude and longitude and putting it in right API format
    lat_lon = '&lat=' + userlat_long.split('_')[0] + '&lon=' + userlat_long.split('_')[1]
    
    # complete url address 
    complete_url = base_url + "appid=" + api_key + lat_lon    
    response = requests.get(complete_url) 
    
    # json dumping into text file
    x = response.json() 
    with open('results/' + str(request_id) + '.txt', 'w') as outfile:
        json.dump(x, outfile)
    return





