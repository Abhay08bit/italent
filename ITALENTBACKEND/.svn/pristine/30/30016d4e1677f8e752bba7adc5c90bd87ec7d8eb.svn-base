# -*- coding: UTF-8 -*-
"""
Module to send email
"""

from structlog import get_logger
# from native_pkgs.dao.config_reader import ConfigReader
import smtplib as s
import getpass


class Smtp(object):
    def __init__(self, sender_email, receiver_email, password):
        self.sender_email = sender_email
        self.receiver_email = receiver_email
        self.password = password
        # print(sender_email, receiver_email, password)

    def send_email(self, msg):
        ob = s.SMTP("smtp.gmail.com", 587)
        ob.starttls()
        ob.login(self.sender_email, self.password)

        subject = "iTalentHub contact detail"
        body = msg

        message = "Subject:{}\n\n{}".format(subject,body)

        add = [self.receiver_email]
        ob.sendmail("csemanmohanprof", add, message)
        print("Message sent successfully.")
        ob.quit()