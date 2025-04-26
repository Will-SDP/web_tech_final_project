import requests
 
import requests

url = "https://api.freeapi.app/api/v1/public/dogs"

querystring = {"page":"1","limit":"200"}

headers = {"accept": "application/json"}

response = requests.get(url, headers=headers, params=querystring)
all_dogs = response.json() 
bred_for = set()
for i in all_dogs["data"]["data"]:
    if 'bred_for' in i.keys():
        results = i['bred_for'].split(',')
        for x in results:
            y = x.strip()
            if y not in bred_for:
                bred_for.add(y)

print(bred_for)            