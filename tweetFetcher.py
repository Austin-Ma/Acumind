#!/usr/bin/env python
import sys
import tweepy
import json
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def get_data():
    user_id = request.form.get('user_id')
    access_token = request.form.get('access_token')
    access_token_secret = request.form.get('access_token_secret')
    consumer_key = "kvA6otmfyiFjPU9TeF2Cg9EDB"
    consumer_secret = "2xKeuXI21SZKwWR5nPeFr5yUfPw43tLoehDMBMarwIaKZWf844"

    #POST request Twitter for Token and secret, then they send it back to us (consumer keys given per app)
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    #auth key are received per unique user sign in
    auth.set_access_token(access_token, access_token_secret)

    #Pull tweets using authentication and user_id
    api = tweepy.API(auth)
    public_tweets = api.user_timeline(user_id)

    #Filters unecessary key value pairs in JSON data
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



if __name__ == "__main__":
    app.run()
