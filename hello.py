#!/usr/bin/env python
import sys
import tweepy
import json
from flask import Flask
from flask import request
app = Flask(__name__)

@app.route('/', methods=['POST'])
def work():
    # data = request.get_json(force=True, silent=True)
    # data = json.loads(json.dumps(request.data))
    # print(data)


    user_id = request.form.get('user_id')
    print(user_id)
    access_token = request.form.get('access_token')
    print(access_token)
    access_token_secret = request.form.get('access_token_secret')
    print(access_token_secret)
    #POST request Twitter for Token and secret, then they send it back to us


    auth = tweepy.OAuthHandler('kvA6otmfyiFjPU9TeF2Cg9EDB', '2xKeuXI21SZKwWR5nPeFr5yUfPw43tLoehDMBMarwIaKZWf844')
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    public_tweets = api.user_timeline(user_id)



    #FUNCTION FOR FORMATTING FORMATTING JSON and removing unnecessary entries
    jsonData = []
    input_dict = []
    final_string = ""

    #Concatenates plain text tweets into json formatted string
    for tweet in public_tweets:
        json_str = json.dumps(tweet._json)
        jsonData.append(json_str)


    #Converts JSON string to python dictionary for filtering. List of dictionaries
    for entry in jsonData:
        input_dict.append(json.loads(entry))


    #Filters each dictionary in list to only include text and time created
    for dict in input_dict:
        del dict['entities']

        for key in dict.keys():
            if key!="text" and key!= "created_at":
                del dict[key]

        #convert back to string
        #dict = json.dumps(dict)



    final_string = json.dumps(input_dict,indent=4, sort_keys=True)
    return (final_string)



    #Get token from POST request from front end
    #Send JSON data as a POST request to Will's text analysis


    #.iteritems vs .keys()
    #Causes problems when you move onto the next entry
    #https://stackoverflow.com/questions/5384914/how-to-delete-items-from-a-dictionary-while-iterating-over-it

if __name__ == "__main__":
    app.run()