# -*- coding: utf-8 -*-
"""
Main method to start EAAS API
"""
import json
import random
import sys
import numpy as np
from os.path import join, dirname, abspath
from sys import path as sys_path

from flask_cors import CORS

sys_path.append(join(dirname(abspath(__file__))))
from traceback import print_exc
from json import dumps, loads
import logging

from flask import Flask, request, g, jsonify

# pulling all native services
from native_pkgs.dao.config_reader import ConfigReader
from native_pkgs.dao.mongo_db_client import MongoDBClient

# pulling smtp package from bl
from native_pkgs.bl.smtp import Smtp

CONF = ConfigReader().read()

# Logging Detail...
log_file = CONF.get("log", "file_name")
level = CONF.get("log", "level")

logging.basicConfig(filename=log_file,level=level)
try:
    APP = Flask(__name__)
    cors = CORS(APP)

    MONGO_IP = CONF.get("mongo", "mongo_ip")
    MONGO_PORT = CONF.get("mongo", "mongo_port")
    SCHEMA_DATABASE = CONF.get("mongo", "db_name")
    RUNTIME_COLLECTION = CONF.get("mongo", "runtime_metadata_collection")
    #
    MONGO_RUNTIME = MongoDBClient(MONGO_IP, MONGO_PORT, SCHEMA_DATABASE, RUNTIME_COLLECTION)
    MONGO_RUNTIME.connect()
    print("mongo db connected..")
    # RUNTIME_METADATA = MONGO_RUNTIME.find_one()["metadata"]
    MONGO_RUNTIME.close()

    # MAil server initialization
    sender_id = CONF.get("mail", "sender_id")
    receiver_id = CONF.get("mail", "receiver_id")
    password = CONF.get("mail", "password")

    logging.debug("Server Successfully started..")
    print("Server Successfully started..")


except Exception as error:
    print_exc()
    logging.error(error)
    raise error


@APP.route("/", methods=["GET"])
def reply_test():
    """
    method for getting reply from eaas backend engine
    :return: response
    """
    print("Get request to test server connectivity")
    return "success"


@APP.route("/eaas/v1/api", methods=["POST"])
def reply():
    """
    method for getting reply from eaas backend engine
    :return: response
    """
    params = request.json
    print(params)
    # username = params["email"]
    key = (params["search_key"]).lower()
    # print("payloads are:", key)
    # LOG.bind(end_user=username)
    try:
        logging.info("Parameters passed: " + str(params))
        # start_pre_processing()
        print(key)

        # To generate result
        MONGO_RUNTIME.connect()
        # result = []
        if key == "all":

            if "search_key" in params and params["search_key"] == "Primary Skills":
                    query = {params['search_key']: {'$regex': '.*' + params['value'][0] + '.*'}}
                    result = MONGO_RUNTIME.find_skill(query)
                    print(result)
            else:
                result = MONGO_RUNTIME.find_all()
        else:
            query = {params['search_key']: {'$regex': '.*' + params['value'][0] + '.*'}}
            result = MONGO_RUNTIME.find(query)
        MONGO_RUNTIME.close()

        # start_post_processing()
        logging.info("Response generated: " + str(result))
        sys.stdout.flush()
        return dumps(result)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error while processing the result"}


@APP.route("/eaas/mrs/v1/api", methods=["POST"])
def reply_mrs():
    """
    method for getting reply from eaas backend engine for multiple resource. - This needs to be worked..
    :return: response
    """
    params = request.json
    print(params)
    # res = [{"team1": {}, "team2": {}, "team3": {}, "team4": {}, "team5": {}}]
    res = []
    team1 = []
    team2 = []
    team3 = []
    team4 = []
    team5 = []

    # team1 = {}
    # team2 = {}
    # team3 = {}
    # team4 = {}
    # team5 = {}

    # LOG.bind(end_user=username)
    try:
        logging.info("Parameters passed: " + str(params))
        # To generate result
        MONGO_RUNTIME.connect()
        for i in params["param"]:
            res_dict = {}
            search_key = i["search_key"]
            value = i["value"]

            # Removing leading space from value string
            if "SAP" not in value:
                if "developer" in value or "Developer" in value:
                    value1 = (value.split(" ")[0]).title()
                else:
                    value1 = (value.strip()).title()
            else:
                value1 = value.strip()

            count = i["count"]
            exp = i["Exp"]

            # For getting experience range
            # exp = "1-3"
            if "+" in exp:
                exp = exp.rstrip("+")
                exp_l = int(exp)
                exp_h = 30
            else:
                exp_list = exp.split("-")
                exp_l = exp_list[0]
                exp_h = exp_list[1]

            # print("exp & val..", exp_h, exp_l, value1)

            query = {search_key: {'$regex': '.*' + value1 + '.*'}, "Exp": {"$gt" : exp_l}, "Exp": {"$lte" : exp_h}}
            query1 = {search_key: {'$regex': '.*' + value1.title() + '.*'}, "Exp": {"$gt": exp_l}, "Exp": {"$lte": exp_h}}
            result = MONGO_RUNTIME.find_mrs(query)
            result1 = MONGO_RUNTIME.find_mrs(query1)

            for i in result1:
                result.append(i)
            # print("........ Result...", result)

            if len(result) < 1:
                query = {"Primary Skills": value1}
                result = MONGO_RUNTIME.find(query)
            if result:
                print("in if block of team split calling method..")
                team1, team2, team3, team4, team5 = team_split(result, count, team1, team2, team3, team4, team5)
            else:
                print("in else block of team split calling method..")
                continue

        MONGO_RUNTIME.close()
        if not params["isAdmin"]:
            team1 = changeNames(team1[0])
            team2 = changeNames(team2[0])
            team3 = changeNames(team3[0])
            team4 = changeNames(team4[0])
            team5 = changeNames(team5[0])
        
    
        team1 = flatten(team1)
        team2 = flatten(team2)
        team3 = flatten(team3)
        team4 = flatten(team4)
        team5 = flatten(team5)

        print(team2)

        

        # if team1:
        #     # print("team1...",team1[0])
        #     res[""]["id"] = 1
        #     res[""]["status"] = True
        #     res[""]["data"] = team1
        # else:
        #     res[""]["id"] = 1
        #     res[""]["status"] = False
        #     res[""]["data"] = team1

        # if team2:
        #     res[""]["id"] = 2
        #     res[""]["status"] = True
        #     res[""]["data"] = team2
        # else:
        #     res[""]["id"] = 2
        #     res[""]["status"] = False
        #     res[""]["data"] = team2

        # if team3:
        #     res[""]["id"] = 3
        #     res[""]["status"] = True
        #     res[""]["data"] = team3
        # else:
        #     res[""]["id"] = 3
        #     res[""]["status"] = False
        #     res[""]["data"] = team3

        # if team4:
        #     res[""]["id"] = 4
        #     res[""]["status"] = True
        #     res[""]["data"] = team4
        # else:
        #     res[""]["id"] = 4
        #     res[""]["status"] = False
        #     res[""]["data"] = team4

        # if team5:
        #     res[""]["id"] = 5
        #     res[""]["status"] = True
        #     res[""]["data"] = team5
        # else:
        #     res[""]["id"] = 5
        #     res[""]["status"] = False
        #     res[""]["data"] = team5

        if team1:
            # print("team1...",team1[0])
            res.append({
                "id": 1,
                "status": True,
                "data": team1
            },)
        else:
            res.append({
                "id": 1,
                "status": False,
                "data": team1
            },)

        if team2:
            res.append({
                "id": 2,
                "status": True,
                "data": team2
            },)
        else:
            res.append({
                "id": 2,
                "status": False,
                "data": team2
            },)

        if team3:
            res.append({
                "id": 3,
                "status": True,
                "data": team3
            },)
        else:
            res.append({
                "id": 3,
                "status": False,
                "data": team3
            },)

        if team4:
            res.append({
                "id": 4,
                "status": True,
                "data": team4
            },)
        else:
            res.append({
                "id": 4,
                "status": False,
                "data": team4
            },)

        if team5:
            res.append({
                "id": 5,
                "status": True,
                "data": team5
            })
        else:
            res.append({
                "id": 5,
                "status": False,
                "data": team5
            })
        

        # print("+++++++++After+++++++++++", team1)
        logging.info("Response generated: " + str(res))
        sys.stdout.flush()
        return dumps(res)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error while processing the result"}
    
# @APP.route("/eaas/mrs/v1/api", methods=["POST"])
# def reply_mrs():
    """
    method for getting reply from eaas backend engine for multiple resource. - This needs to be worked..
    :return: response
    """
    params = request.json
    print(params)
    res = {"team1": {}, "team2": {}, "team3": {}, "team4": {}, "team5": {}}
    team1 = []
    team2 = []
    team3 = []
    team4 = []
    team5 = []

    # LOG.bind(end_user=username)
    try:
        logging.info("Parameters passed: " + str(params))
        # To generate result
        MONGO_RUNTIME.connect()
        for i in params["param"]:
            res_dict = {}
            search_key = i["search_key"]
            value = i["value"]

            # Removing leading space from value string
            if "SAP" not in value:
                value1 = (value.strip()).title()
            else:
                value1 = value.strip()

            count = i["count"]
            exp = i["Exp"]

            # For getting experience range
            # exp = "1-3"
            if "+" in exp:
                exp = exp.rstrip("+")
                exp_l = int(exp)
                exp_h = 30
            else:
                exp_list = exp.split("-")
                exp_l = exp_list[0]
                exp_h = exp_list[1]

            # print("exp & val..", exp_h, exp_l, value1)

            query = {search_key: {'$regex': '.*' + value1 + '.*'}, "Exp": {"$gt" : exp_l}, "Exp": {"$lte" : exp_h}}
            query1 = {search_key: {'$regex': '.*' + value1.title() + '.*'}, "Exp": {"$gt": exp_l}, "Exp": {"$lte": exp_h}}
            result = MONGO_RUNTIME.find_mrs(query)
            result1 = MONGO_RUNTIME.find_mrs(query1)

            for i in result1:
                result.append(i)
            # print("........ Result...", result)

            if len(result) < 1:
                query = {"Primary Skills": value1}
                result = MONGO_RUNTIME.find(query)
            if result:
                print("in if block of team split calling method..")
                team1, team2, team3, team4, team5 = team_split(result, count, team1, team2, team3, team4, team5)
            else:
                print("in else block of team split calling method..")
                continue

        MONGO_RUNTIME.close()
        team1 = flatten(team1)
        team2 = flatten(team2)
        team3 = flatten(team3)
        team4 = flatten(team4)
        team5 = flatten(team5)

        if team1:
            # print("team1...",team1[0])
            res["team1"]["status"] = True
            res["team1"]["data1"] = team1
        else:
            res["team1"]["status"] = False
            res["team1"]["data1"] = team1

        if team2:
            res["team2"]["status"] = True
            res["team2"]["data2"] = team2
        else:
            res["team2"]["status"] = False
            res["team2"]["data2"] = team2

        if team3:
            res["team3"]["status"] = True
            res["team3"]["data3"] = team3
        else:
            res["team3"]["status"] = False
            res["team3"]["data3"] = team3

        if team4:
            res["team4"]["status"] = True
            res["team4"]["data4"] = team4
        else:
            res["team4"]["status"] = False
            res["team4"]["data4"] = team4

        if team5:
            res["team5"]["status"] = True
            res["team5"]["data5"] = team5
        else:
            res["team5"]["status"] = False
            res["team5"]["data5"] = team5

        # print("+++++++++After+++++++++++", team1)
        logging.info("Response generated: " + str(res))
        sys.stdout.flush()
        return dumps(res)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error while processing the result"}


@APP.route("/eaas/reg/v1/api", methods=["POST"])
def reply_reg():
    """
    method for inserting new value in DB.
    :return: response- success
    """
    result = {}
    params = request.json
    query = params["query"]
    print(query)
    # LOG.bind(end_user=username)
    try:
        if not query["E_mail"]:
            result["status"] = False
            result["data"] = "Mandetory field missing.."
            return result
        else:
            # To register candidate detail
            MONGO_RUNTIME.connect()
            res = MONGO_RUNTIME.password_match_1(query["E_mail"])
            # print("++++++++++++res+++++++", res)
            if not res:
                MONGO_RUNTIME.insert(query)
                logging.info("Inserted new value:")
                res = MONGO_RUNTIME.password_match_1(query["E_mail"])
                percentage = profile_percentage(res)
                result["isCompleted"] = True
                result["completePercentage"] = percentage
                result["status"] = True
                result["data"] = res
            else:
                result["status"] = False
                # result["data"] = res
                result["data"] = "Already registered"

            MONGO_RUNTIME.close()
            return result

    except Exception as error:
        print_exc()
        logging.error(error)
        return {"status": False, "data": "Mandetory field missing..Please check E_mail value"}


@APP.route("/eaas/reg_update/v1/api", methods=["POST"])
def reply_reg_update():
    """
    method for inserting new value in DB.
    :return: response- success
    """
    params = request.json
    email = params["E_mail"]
    data = params["data"]
    # print(email)
    # print(data)
    # LOG.bind(end_user=username)
    try:
        # To register candidate detail
        MONGO_RUNTIME.connect()
        MONGO_RUNTIME.update_email(email, data)
        res = MONGO_RUNTIME.password_match_1(email)
        MONGO_RUNTIME.close()

        logging.info("Updated new value for user with ")
        if res:
            print("+++++++++++++reg_update....", res)
            # calling profile_percentage method
            percentage = profile_percentage(res)
            return {"status": True, "data": res, "isCompleted": True, "completePercentage": percentage}

        else:return {"status": False, "data": "No entry found"}


    except Exception as error:
        print_exc()
        logging.error(error)
        return {"status": False, "data": "Error while inserting value..(payload must have E_mail and Data field)"}


@APP.route("/eaas/login/v1/api", methods=["POST"])
def reply_login():
    """
    method for inserting new value in DB.
    :return: response- success
    """
    try:
        result = {}
        params = request.json
        email = params["E_mail"]
        pswd = params["Pswd"]
        MONGO_RUNTIME.connect()
        res = MONGO_RUNTIME.password_match(email, pswd)

        # print("we got result....", res)

        if res["status"]:
            result["status"] = res["status"]
            result["data"] = res["data"]

            # calling profile_percentage method
            percentage = profile_percentage(res["data"])
            if percentage > 0:
                result["isCompleted"] = True
                result["completePercentage"] = percentage

            MONGO_RUNTIME.close()
            logging.debug("Login method invoked:" + str(result))
            return dumps(result)
        else:
            return res

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}
    
@APP.route("/eaas/profileinfo/v1/api", methods=["POST"])
def profile_info():
    """
    method for inserting new value in DB.
    :return: response- success
    """
    try:
        result = {}
        params = request.json
        email = params["E_mail"]
        query = {"E_mail": email}
        MONGO_RUNTIME.connect()
        res = MONGO_RUNTIME.find(query)

        print("we got result....", res)
        result["status"] = True
        result["data"] = res    
        MONGO_RUNTIME.close()
        logging.debug("Login method invoked:" + str(result))
        return dumps(result)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}


@APP.route("/eaas/skill_collection/v1/api", methods=["POST"])
def reply_skill():
    """
    method for getting dictionary of skill wise resource list .
    :return: list of all resources specific to their resource.
    """
    try:
        params = request.json
        skill_list = params["skills"]
        # skill_list = ["Developer", "Consultant", "QA", "UI"]
        res = []
        MONGO_RUNTIME.connect()
        for skill in skill_list:
            query = {'Designation': {'$regex': '.*' + skill + '.*'}}
            result = MONGO_RUNTIME.find(query)
            # result = changeNames(result)
            res.append(result)
        MONGO_RUNTIME.close()
        res = anonymize_names(res)
        result = {"status": True, "data": res}
        logging.info(res)
        return dumps(result)
    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}


@APP.route("/eaas/contact/v1/api", methods=["POST"])
def reply_contact():
    """
    method for getting dictionary of skill wise resource list .
    :return: list of all resources specific to their resource.
    """
    try:
        params = request.json
        candidate_detail = params["candidate_detail"]
        employer_detail = params["employer_detail"]
        query = {"candidate_detail": candidate_detail, "employer_detail": employer_detail}
        MONGO_CONTACT = MongoDBClient(MONGO_IP, MONGO_PORT, SCHEMA_DATABASE, "employer_contact")
        MONGO_CONTACT.connect()
        MONGO_CONTACT.insert(query)
        print("Successfully added the value.")
        MONGO_CONTACT.close()

        #     res.append(result)
        # print(res)

        result = {"status": True, "data": "We will contact you immediately"}
        # logging.info(res)
        return dumps(result)
    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}
    
@APP.route("/eaas/admin/inquiry/v1/api", methods=["GET"])
def get_admin_inquiry():
    """
    method for getting dictionary of skill wise resource list .
    :return: list of all resources specific to their resource.
    """
    try:
        params = request.json
        MONGO_CONTACT = MongoDBClient(MONGO_IP, MONGO_PORT, SCHEMA_DATABASE, "employer_contact")
        MONGO_CONTACT.connect()
        dbRes =  MONGO_CONTACT.find_all()
        res = []
        
        for i in dbRes:
            rv = {}
            resCandidate = []
            for j in i["candidate_detail"]:
                x = {"Name":"" ,"Email":"" ,"Phone":""}
                x["Name"] = j["Name"]
                x["Email"] = j["E_mail"]
                x["Phone"] = j["Phone"]
                resCandidate.append(x)
            rv["candidate"]=resCandidate
            y ={}
            y["Name"] = i["employer_detail"]["Name"]
            y["Email"] = i["employer_detail"]["Email"]
            y["Company"] = i["employer_detail"]["Company"]
            rv["employer"] = y
            res.append(rv)

        result = {"status": True, "data":res}
        MONGO_CONTACT.close()

        # logging.info(res)
        return dumps(result)
    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}


@APP.route("/eaas/contact_us/v1/api", methods=["POST"])
def reply_contact_us():
    """
    contact to iTalentHub for their purpose.
    :return: Success
    """
    try:
        params = request.json
        MONGO_CONTACT = MongoDBClient(MONGO_IP, MONGO_PORT, SCHEMA_DATABASE, "contact_us")
        MONGO_CONTACT.connect()
        MONGO_CONTACT.insert(params)
        # print("Successfully added the value.")
        MONGO_CONTACT.close()
        try:
            smtp = Smtp(sender_id, receiver_id, password)
            smtp.send_email("Hello Team, Please contact-")
        except Exception as e:
            logging.error(e)
            print(e)
        result = {"status": True, "data": "Thanks for contacting us, Always we look forward to help you"}
        # logging.info(res)
        return dumps(result)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}
    
@APP.route("/eaas/email_verify/v1/api", methods=["POST"])
def reply_email_verify():
    """
    contact to iTalentHub for their purpose.
    :return: Success
    """
    try:
        params = request.json
        MONGO_OTP = MongoDBClient(MONGO_IP, MONGO_PORT, SCHEMA_DATABASE, "verifyOtp")
        MONGO_OTP.connect()
        MONGO_OTP.insert(params)
        # print("Successfully added the value.")
        MONGO_OTP.close()
        try:
            smtp = Smtp(sender_id, receiver_id, password)
            smtp.send_email("Hello Team, Please contact-")
        except Exception as e:
            logging.error(e)
            print(e)
        result = {"status": True, "data": "Thanks for contacting us, Always we look forward to help you"}
        # logging.info(res)
        return dumps(result)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}


@APP.route("/eaas/analytics/v1/api", methods=["GET"])
def reply_analytics():
    """
    contact to iTalentHub for their purpose.
    :return: Success
    """
    try:
        MONGO_RUNTIME.connect()
        analytics_data = MONGO_RUNTIME.analytics()
        print("total count is:", analytics_data)
        MONGO_RUNTIME.close()
        result = {"status": True, "data": analytics_data}
        return dumps(result)

    except Exception as error:
        logging.error(error)
        return {"status": False, "data": "Error encountered, Please check the keywords"}


def profile_percentage(res):
    # To get count of filled value for user profile
    cnt = 0
    for k, v in res.items():
        if v:
            cnt += 1

    # To find profile completed flag and percentage value
    percentage = (cnt * 100) / 20
    percentage = round(percentage, -1)
    # print(percentage)
    return percentage


# def team_split(res, count, team1, team2, team3, team4, team5):
#     # res = [{'status': True, 'java': [{'Name': 'Anurag Srivatsava', 'DOB': '1994/01/26', 'Age': '26', 'Location': 'India', 'Gender': 'Male','Ext_Platform': '', 'Exp': '2.10', 'Designation': 'Java Developer', 'Primary Skills': 'Java,Spring Boot','Secondary Skills': '', 'E_mail': 'srivastava.anurag2694@gmail.com', 'Per_hr_charge': 0.0, 'Unit': '','Phone': '9110601864', 'Education': 'B-Tech', 'JpSkills': '', 'JpLevel': '', 'JpCertification': 'N-0', 'EngSkills': 'Yes', 'EngLevel': '', 'EngCertification': '', 'Nickname': '', 'Rating': 3.0}]}]
#     # count = 3
#     i = res
#     print("res in team_split...", res)
#     l_count = count
#     h_count = count * 5
#     l2_count = l_count + count
#     l3_count = l_count + count + count
#     l4_count = l_count + count + count + count

#     print("all counter", l_count, l2_count, l3_count, l4_count, h_count)

#     if len(i) <= l_count:
#         print("in if block")
#         team1.append(i)
#         team2.append(i)
#         team3.append(i)
#         team4.append(i)
#         team5.append(i)

#     elif l_count < len(i) < l2_count + 1:
#         print("in elif block")
#         team1.append(i[:l_count])
#         team2.append(i[l_count - 1:-1])
#         team3.append(i[l_count - 1:-1])
#         team4.append(i[l_count - 1:-1])
#         team5.append(i[l_count - 1:-1])

#     elif l2_count < len(i) < l3_count + 1:
#         print("in 2nd elif block")
#         team1.append(i[:l_count])
#         team2.append(i[l_count:l2_count])
#         # print("++++", i["java"][l2_count - 1:-1])
#         team3.append(i[l2_count - 1:-1])
#         team4.append(i[l2_count - 1:-1])
#         team5.append(i[l2_count - 1:-1])

#     elif l3_count < len(i) < l4_count + 1:
#         print("in 3rd elif block", i[1])
#         team1.append(i[:l_count])
#         team2.append(i[l_count:l2_count])
#         team3.append(i[l2_count:l3_count])
#         team4.append(i[l3_count - 1:-1])
#         team5.append(i[l3_count - 1:-1])

#     else:
#         print("in else block")
#         team1.append(i[:l_count])
#         team2.append(i[l_count:l2_count])
#         team3.append(i[l2_count:l3_count])
#         team4.append(i[l3_count:l4_count])
#         team5.append(i[l3_count:h_count])
#     return team1, team2, team3, team4, team5

def changeNames(data):
    returnData = []
    anonymized_data = []
    for person in data:
        anonymized_person = {}
        for key, value in person.items():
            if key == 'Name':
                anonymized_name = ''
                for word in value.split():
                    anonymized_name += word[0] + '.' * (len(word) - 1) + ' '
                anonymized_person[key] = anonymized_name.strip()  # Remove trailing space
            else:
                anonymized_person[key] = value
        anonymized_data.append(anonymized_person)
    returnData.append(anonymized_data)
    return returnData

def anonymize_names(data):
    anonymized_data = []
    for group in data:
        anonymized_group = []
        for person in group:
            anonymized_person = {}
            for key, value in person.items():
                if key == 'Name':
                    anonymized_name = ''
                    for word in value.split():
                        anonymized_name += word[0] + '.' * (len(word) - 1) + ' '
                    anonymized_person[key] = anonymized_name.strip()  # Remove trailing space
                else:
                    anonymized_person[key] = value
            anonymized_group.append(anonymized_person)
        anonymized_data.append(anonymized_group)
    return anonymized_data
         

def team_split(res, count, team1, team2, team3, team4, team5):
    # res = [{'status': True, 'java': [{'Name': 'Anurag Srivatsava', 'DOB': '1994/01/26', 'Age': '26', 'Location': 'India', 'Gender': 'Male','Ext_Platform': '', 'Exp': '2.10', 'Designation': 'Java Developer', 'Primary Skills': 'Java,Spring Boot','Secondary Skills': '', 'E_mail': 'srivastava.anurag2694@gmail.com', 'Per_hr_charge': 0.0, 'Unit': '','Phone': '9110601864', 'Education': 'B-Tech', 'JpSkills': '', 'JpLevel': '', 'JpCertification': 'N-0', 'EngSkills': 'Yes', 'EngLevel': '', 'EngCertification': '', 'Nickname': '', 'Rating': 3.0}]}]
    # count = 3
    # print("1234",res)
    i = res
    np.random.shuffle(i)
    # print("1234",i)
    # print("res in team_split...", res)
    l_count = count
    h_count = (count * 5)
    l2_count = l_count + count
    l3_count = l_count + count + count
    l4_count = l_count + count + count + count

    print("all counter", l_count, l2_count, l3_count, l4_count, h_count)

    if len(i) <= l_count:
        print("in if block")
        team1.append(i)
        team2.append(i)
        team3.append(i)
        team4.append(i)
        team5.append(i)

    elif l_count < len(i) < l2_count + 1:
        print("in elif block")
        team1.append(i[:l_count])
        team2.append(i[l_count - 1:-1])
        team3.append(i[l_count - 1:-1])
        team4.append(i[l_count - 1:-1])
        team5.append(i[l_count - 1:-1])

    elif l2_count < len(i) < l3_count + 1:
        print("in 2nd elif block")
        team1.append(i[:l_count])
        team2.append(i[l_count:l2_count])
        # print("++++", i["java"][l2_count - 1:-1])
        team3.append(i[l2_count - 1:-1])
        team4.append(i[l2_count - 1:-1])
        team5.append(i[l2_count - 1:-1])

    elif l3_count < len(i) < l4_count + 1:
        print("in 3rd elif block", i[1])
        team1.append(i[:l_count])
        team2.append(i[l_count:l2_count])
        team3.append(i[l2_count:l3_count])
        team4.append(i[l3_count - 1:-1])
        team5.append(i[l3_count - 1:-1])

    else:
        print("in else block")
        team1.append(i[:l_count])
        team2.append(i[l_count:l2_count])
        team3.append(i[l2_count:l3_count])
        team4.append(i[l3_count:l4_count])
        team5.append(i[l4_count:h_count])
    return team1, team2, team3, team4, team5

def flatten(nested_list):
    """
    input: nested_list - this contain any number of nested lists.
    ------------------------
    output: new_lists - one list contain all the items.
    """

    new_lists = []
    for item in nested_list:
        new_lists.extend(item)
    return new_lists


if __name__ == "__main__":
    HOST = CONF.get("api", "api_host")
    PORT = int(CONF.get("api", "api_port"))
    APP.run(host=HOST, port=PORT, debug=False, use_reloader=False)