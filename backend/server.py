from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from lxml import html
import requests
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys


app = Flask(__name__)
api = Api(app)

CORS(app)


@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})

def getPrices(crop, crop_2):

    price_page = requests.get('https://markets.businessinsider.com/commodities/' + crop + '-price')  # url
    price_page_tree = html.fromstring(price_page.content)
    raw_info = price_page_tree.xpath('//span//text()')

    price = raw_info[29]
    delta_usd = raw_info[34]
    delta = raw_info[36][1:-2]

    url = "https://www.cmegroup.com/trading/agricultural/grain-and-oilseed/" + crop_2 + "_quotes_globex.html";
    driver = webdriver.Chrome("/Users/kitan/Documents/GitHub/GEWEEK/backend/chromedriver")

    driver.get(url)
    time.sleep(6)
    forecast_page_content = bytes(driver.page_source, 'utf-8')

    forecast_price_page_tree = html.fromstring(forecast_page_content)
    raw_delta_fc = forecast_price_page_tree.xpath('//tr/td/text()')[6:]

    delta_2m = float('.'.join(raw_delta_fc[0].split('\'')))
    delta_6m = float('.'.join(raw_delta_fc[13].split('\'')))
    delta_12m = float('.'.join(raw_delta_fc[26].split('\'')))


    price_info = {
        'name': crop,
        'price': price,
        'delta_usd': delta_usd,
        'delta': delta,
        'delta_2m': delta_2m,
        'delta_6m': delta_6m,
        'delta_12m': delta_12m
    }

    return price_info

corn_info = getPrices("corn", "corn");
rice_info = getPrices("rice","rough-rice");
wheat_info = getPrices("wheat", "kc-wheat");

price_info_db = {
    'corn': corn_info,
    'rice': rice_info,
    'wheat': wheat_info
}

class Prices(Resource):

    def get(self, crop):
        return price_info_db[crop]



class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]}

class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)


api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3
api.add_resource(Prices, '/prices/<crop>') # Route_4


if __name__ == '__main__':
   app.run(port=5002)