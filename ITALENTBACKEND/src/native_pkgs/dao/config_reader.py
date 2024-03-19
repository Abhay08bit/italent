# -*- coding: UTF-8 -*-
"""
Module to unify changes in config file usage
"""
from structlog import get_logger
from configparser import ConfigParser


class ConfigReader(object):
    """
    Class for reading configuration file
    """

    def __init__(self):
        try:
            self.conf_obj = ConfigParser()
        except ImportError:
            get_logger().exception("ImportError: Failed to import ConfigParser")

    def read(self):
        """
        method to read config file
        :return: config reader object
        """
        try:
            self.conf_obj.read("./conf/config.ini")
            return self.conf_obj
        except Exception as err:
            get_logger().exception("Error: " + str(err))
            raise err
