# import smtplib, ssl
#
# port = 465  # For SSL
# password = input("Type your password and press enter: ")
#
# # Create a secure SSL context
# context = ssl.create_default_context()
#
# with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
#     server.login("indosakura.tokyo.ithub@gmail.com", password)
#     # TODO: Send email here

# import smtplib, ssl
#
# smtp_server = "smtp.gmail.com"
# port = 1025  # For starttls
# sender_email = "indosakura.tokyo.ithub@gmail.com"
# password = input("Type your password and press enter: ")
#
# # Create a secure SSL context
# context = ssl.create_default_context()
#
# # Try to log in to server and send email
# try:
#     server = smtplib.SMTP(smtp_server, port)
#     server.ehlo() # Can be omitted
#     server.starttls(context=context) # Secure the connection
#     server.ehlo() # Can be omitted
#     server.login(sender_email, password)
#     # TODO: Send email here
# except Exception as e:
#     # Print any error messages to stdout
#     print(e)
# finally:
#     server.quit()


import smtplib as s
import getpass


ob = s.SMTP("smtp.gmail.com", 587)
ob.starttls()
email = "csemanmohanprof@gmail.com"
# password = input("Type your password and press enter:")
password = getpass.getpass('Password :: ')
ob.login(email, password)

message = """\
Subject: Test

This message is from iTalentHub."""
add = ["csemanmohan@gmail.com"]
ob.sendmail("csemanmohanprof", add, message)
print("Message sent successfully.")
ob.quit()