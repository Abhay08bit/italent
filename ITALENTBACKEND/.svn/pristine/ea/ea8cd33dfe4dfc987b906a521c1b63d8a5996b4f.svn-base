# -*- coding: UTF-8 -*-
"""
Module for fetching agent details from MongoDB
"""
from pymongo import MongoClient
import logging

# For counting dict of skills
from collections import Counter


class MongoDBClient(object):
    """
    Class  to do CRUD operation in mongo database
    """

    def __init__(self, ip, port, database, collection):
        if not (ip or port or database or collection):
            raise ValueError("Exception: Empty params")
        try:
            self.mongo_ip = ip
            self.mongo_port = port
            self.database = database
            self.collection = collection
            self.connection = None
            self.__mongo_ = MongoClient(self.mongo_ip, int(self.mongo_port))
        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            raise err

    def connect(self):
        """
        Method for connecting to MongoDB
        :return: NA
        """
        database = self.__mongo_[self.database]
        self.connection = database[self.collection]

    def close(self):
        """
        Method to close connection from MongoDB
        :return: NA
        """
        self.__mongo_.close()

    def save(self, parameter):
        """
        Method to save the  collection with new data
        :param parameter:
        :return:
        """
        self.connection.save(parameter)

    def insert(self, parameter):
        """
        Method to add a field in MongoDB with new data
        :param parameter: field to be added
        :return: NA
        """
        self.connection.insert_one(parameter)

    def update_email(self, email, data):
        """
        Method to add a field in MongoDB with new data
        :param parameter: field to be added
        :return: NA
        """
        try:
            print(email, data)
            # self.connection.update({"E_mail": email}, {set: data})
            self.connection.update({"E_mail": email}, {"$set": data}, upsert=False)
            # self.connection.insert_one(data)

        except Exception as err:
            logging.error("Exception while updating to DB: " + str(err))
            return "Error while updating value"

    def insert_many(self, parameter):
        """
                Method to add multiple field in MongoDB with new data
                :param parameter: field to be added
                :return: NA
        """
        self.connection.insert_many(parameter)

    def delete(self, parameter):
        """
        Method to delete a field from MongoDB
        :param parameter: field to be deleted
        :return: NA
        """
        self.connection.delete_one(parameter)

    def retrieve(self, parameter):
        """
        Method to fetch details of a particular key from DB
        :param parameter: key name to be fetched from DB
        :return: Value of the fetched key
        """
        return self.connection.find(parameter)

    def update(self, mongo_id, parameter):
        """
        Method to update a field in given object of MongoDB
        :param mongo_id: Object of the field to be updated
        :param parameter: Value to be updated
        :return: NA
        """
        self.connection.update({"_id": mongo_id}, {"$set": parameter}, upsert=False)

    def distinct(self, parameter):
        """
        Method to get a list of distinct values for `key` among all documents
        :param parameter: key
        :return: values
        """
        return self.connection.distinct(parameter)

    def find_one(self, query=None):
        """
        Method to get a value with key name in document
        :return: value
        """
        if query:
            return self.connection.find_one(query)
        else:
            return self.connection.find_one()

    def find_mrs(self, query=None):
        """Trying composite query
        :return value
        """
        try:
            if query:
                documents_list = []
                # print(query)
                documents = self.connection.find(query)
                for document in documents:
                    # print("document is:", document)
                    document.pop('_id')
                    self.password_mask(document)
                    documents_list.append(document)

                return documents_list

            else:
                return self.connection.find()

        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            return "Error in query format"

    def find(self, query=None):
        """Trying composite query
        :return value
        """
        try:
            if query:
                documents_list = []
                documents = self.connection.find(query)
                for document in documents:
                    # print("document is:", document)
                    document.pop('_id')
                    self.password_mask(document)
                    documents_list.append(document)

                return documents_list

            else:
                return self.connection.find()

        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            return "Error in query format"

    def find_skill(self, query=None):
        """Trying composite query
        :return value
        """
        try:

            if query:
                documents_list = []
                documents = self.connection.find(query)
                for document in documents:
                    # print("document is:", document)
                    document.pop('_id')
                    self.password_mask(document)
                    documents_list.append(document)

                return documents_list

            else:
                return self.connection.find()

        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            return "Error in query format"

    def find_all(self):
        """
         Method to get all the documents in the collections
        :return:
        """
        try:

            documents_list = []
            documents = self.connection.find()

            print("document is:", documents)
            for document in documents:
                # print("document is:", document)
                document.pop('_id')
                self.password_mask(document)
                documents_list.append(document)

            return documents_list

        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            return "Error in query format"

    def password_match(self, email, pswd):
        """
                 Method to match password for user login
                :return: user data and match status
        """
        try:
            query = {"E_mail": email}
            result = {}
            data = self.connection.find_one(query)
            if data:
                data.pop('_id')
                if pswd == data["Pswd"]:
                    result["status"] = True
                    result["data"] = data
                    self.password_mask(result["data"])
                else:
                    result["status"] = False
                    result["data"] = "Invalid credential"
            else:
                result["status"] = False
                result["data"] = "Invalid credential"
            return result

        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            return {"status": False, "data":"Error in query format"}

    # For single param
    def password_match_1(self, email):
        """
        Method to match password for user login
        :return: user data and match status
        """
        try:
            query = {"E_mail": email}
            # print(query)
            result = self.connection.find_one(query)
            if result:
                # print("result fetched from DB..", result)
                result.pop('_id')
                self.password_mask(result)
                return result
            else:
                print("result fetched from DB..", result)
                return result

        except Exception as err:
            logging.error("Exception in connecting to Mongo database: " + str(err))
            return {"status": False, "data": "Error in query format"}

    def password_mask(self, res):
        try:
            # print("invoking password_mask method with..", res)
            res = res.pop("Pswd")
            return res
        except Exception as error:
            logging.error("Exception in connecting to Mongo database: " + str(error))
            return {"status": False, "data":"Error in query format"}

    def analytics(self):
        try:
            res = {}
            skills = ["python", "data science", "java", "html", "testing", "sales", "net", "japanese", "SAP"]
            # sought_skills = ["python", "data science", "java", "html", "net"]

            # To get count of each individual skill
            res_all_skills = {}
            for skill in skills:
                if skill == "SAP":
                    query = {"Primary Skills": {'$regex': '.*' + skill + '.*'}}
                    d = self.connection.find(query).count()
                    res_all_skills[skill] = d
                else:
                    query1 = {"Primary Skills": {'$regex': '.*' + skill + '.*'}}
                    query2 = {"Primary Skills": {'$regex': '.*' + skill.title() + '.*'}}
                    d1 = self.connection.find(query1).count()
                    d2 = self.connection.find(query2).count()
                    d = d1+d2
                    res_all_skills[skill] = d

            # For most disrable skill
            # res_sought_skills = {}
            # for skill_des in sought_skills:
            #     query1 = {"Primary Skills": {'$regex': '.*' + skill_des + '.*'}}
            #     query2 = {"Primary Skills": {'$regex': '.*' + skill_des.title() + '.*'}}
            #     d1 = self.connection.find(query1).count()
            #     d2 = self.connection.find(query2).count()
            #     res_sought_skills[skill_des] = d1 + d2

            res["total_count"] = self.connection.count()
            res["skills"] = res_all_skills
            res_sought_skills = dict(Counter(res_all_skills).most_common(5))
            res["sought_skills"] = res_sought_skills
            print(res)
            return res
        except Exception as error:
            logging.error("Exception in connecting to Mongo database: " + str(error))
            return {"status": False, "data":"Error in query format"}