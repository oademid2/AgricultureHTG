from lxml import html
import requests
import os
dirname = os.path.dirname(__file__)
print(dirname)
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys



# execute script to scroll down the page


def get_delta(crop):
    price_page = requests.get('https://markets.businessinsider.com/commodities/'+crop+'-price')  # url
    price_page_tree = html.fromstring(price_page.content)
    print(type(price_page.content))
    raw_info = price_page_tree.xpath('//span//text()')

    price = raw_info[29]
    delta_usd = raw_info[34]
    delta = raw_info[36][1:-2]

    url = "https://www.cmegroup.com/trading/agricultural/grain-and-oilseed/"+crop+"_quotes_globex.html";
    driver = webdriver.Chrome("/Users/kitan/Documents/GitHub/GEWEEK/backend/chromedriver")

    driver.get(url)
    time.sleep(6)
    forecast_page_content = bytes(driver.page_source,'utf-8')

    forecast_price_page_tree = html.fromstring(forecast_page_content)
    raw_delta_fc= forecast_price_page_tree.xpath('//tr/td/text()')[6:]

    delta_2m = float('.'.join(raw_delta_fc[0].split('\'')))
    delta_6m = float('.'.join(raw_delta_fc[13].split('\'')))
    delta_12m = float('.'.join(raw_delta_fc[26].split('\'')))


    price_info ={
        'price': price,
        'delta_usd': delta_usd,
        'delta': delta,
        'delta_2m': delta_2m,
        'delta_6m': delta_6m,
        'delta_12m':delta_12m
    }
    print(price_info)



def forecastPage():
    url = "https://www.cmegroup.com/trading/agricultural/grain-and-oilseed/corn_quotes_globex.html";
    driver = webdriver.Chrome("/Users/kitan/Documents/GitHub/GEWEEK/backend/chromedriver")

    driver.get(url)
    time.sleep(6)
    forecast_page_content = bytes(driver.page_source,'utf-8')

    forecast_price_page_tree = html.fromstring(forecast_page_content)
    raw_delta_2m = forecast_price_page_tree.xpath('//tr/td/text()')[6:]

    delta_2m = float('.'.join(raw_delta_2m[0].split('\'')))
    delta_6m = float('.'.join(raw_delta_2m[13].split('\'')))
    delta_12m = float('.'.join(raw_delta_2m[26].split('\'')))
    print(delta_2m)
    print(delta_6m)
    print(delta_12m)




    print(raw_delta_2m)



get_delta('corn');
#test()

#get_delta('corn');