import pip._vendor.requests

url = "https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/90210/0"

headers = {
	"X-RapidAPI-Key": "dee5dcce83msh780914d639facb7p1f43c5jsn4c4a7717bb03",
	"X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com"
}

response = pip._vendor.requests.request("GET", url, headers=headers)

x = int(input("Zip Code:"))

print("Restaurants Near You:")
zip = response.json().get('restaurants')
for key, value in zip[0].items():
    print(key, value)

print("Restaurants")
rest = response.json().get('restaurants')
for zipCode in rest:
    if zipCode["zipCode"] == x : 
        for key, value in zipCode[0].items(): 
            print(key, value)
