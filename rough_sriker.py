
import BeautifulSoup as bs4
import json
import re


fo=open('songnamesrem.txt','r')
ln=fo.readlines()
​
​
for il  in ln[373:]:
    print(il)
    songpageadress=il.split(";")[0]
    songname=il.split(";")[-1]
    songname = songname.rstrip()
    
    
    
    
    try:
        songpage=urllib.request.urlopen('http:'+songpageadress)
    except (http.client.IncompleteRead) as e:
        songpage=e.partial
        print("song page not found")
        
    print(songpageadress)
    songpagesoup=BeautifulSoup(songpage, "lxml")
    
     
    song_meaning = songpagesoup.find_all('div' ,class_='text', id_='')
    find_upvotes = songpagesoup.find_all('strong' , class_='numb')
    comment_type = songpagesoup.find_all('strong', class_='title', id ='')
    
    
    
    for div in songpagesoup.find_all("div",{'class':'text'}):
        for div in div(class_='title'):
            div.decompose()
​
    for div in songpagesoup.find_all("div", {'class':'sign'}): 
        div.decompose()
    print(song_meaning)
​
    for div in songpagesoup.find_all("ul", {'class':'answers'}): 
        div.decompose()    
​
   
    #print(song_meaning)
​
    print(song_meaning)
    
        
    data = {}
    data['comment'] = []
    
    if(len(song_meaning) == 0):
        
         data['comment'].append({
                'songname': songname,
                'comment_desc': "nil",
                'upvotes' : 0,
                'comment_type':"nil",
                    
                    })
    
    
    if (len(song_meaning) != 0):
        for (item1,item2,item3) in zip(song_meaning,find_upvotes,comment_type):
            
            
            
            data['comment'].append({
                'songname': songname,
                'comment_desc': item1.getText(),
                'upvotes' : item2.getText(),
                'comment_type' : item3.getText(),
            })
           
   
            
    with open('Songs8/%s.json' % songname , 'w') as outfile:
        json.dump(data, outfile)