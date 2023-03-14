# startup
Start-up application repo for CS 260 project


# [URL for Markdown syntax tips](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

# Elevator Pitch for Startup

Are you sick of Instagram and Facebook with the needless amounts of ads, toxicity, and too many distracting features? The PicShare application takes all of the complexity out of sharing photos with your peers and simply allows you to post pictures you want and see your friends' pictures. Search for your friends on the app and add them to see their pictures and have them see yours. This app is all about just being able to share your photos to share them.

## Key Features

- Secure login over HTTPS
- Add or 'friend' other users
- Post images to your profile
- See images of other users that have been added
- Posts are persistenly stored

![Screenshot 2023-01-25 at 1 26 07 PM](https://user-images.githubusercontent.com/122413893/214682423-0e880b20-3310-4fa8-96ef-d7bbbf1cc60c.png)


### Notes

IP addresses are converted to domain names

#### TCP/IP models

Application	HTTPS	Functionality like web browsing

Transport	TCP	Moving connection information packets

Internet	IP	Establishing connections

Link	Fiber, hardware	Physical connections

## VS Code Git

comd+shift+p -> Git : Merge 
-merges the selected branch to the current branch you are working on

## Server Info

IP:: 3.12.180.81

Domain:: 260webprograming.click/

SSH Command:: ssh -i /Users/rileysinema/Desktop/260-server-keypair.pem ubuntu@3.12.180.81

Update Script Command:: ./deployWebsite.sh -k /Users/rileysinema/Desktop/260-server-keypair.pem -h 260webprograming.click

Update Simon Command:: ./deployFiles.sh -k /Users/rileysinema/Desktop/260-server-keypair.pem -h 260webprograming.click -s simon

## CSS

![image](https://user-images.githubusercontent.com/122413893/218875567-b7ed1e5a-84f7-420e-b766-58b103de5368.png)

# Google fonts
@import url(<<href to googleapi font css family>>)
  
## JavaScript

element.addEventListener('keyup'/'keydown'/'mouseclick', function);
  
## URL
  
The Uniform Resource Locator (URL) represents the location of a web resource. A web resource can be anything, such as a web page, font, image, video stream, database record, or JSON object. It can also be completely ephemeral, such as a visitation counter, or gaming session.

A Uniform Resource Name (URN) is a unique resource name that does not specify location information. For example, a book URN might be urn:isbn:10,0765350386. A Uniform Resource Identifier (URI) is a general resource identifier that could refer to either a URL and URN. With web programming you are almost always talking about URLs and therefore you should not use the more general URI.
