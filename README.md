# EXPRESS TRANSPORT - A Truck Transport Company:
A side project which I have been able to develop for a few hours every month. It essentially aims to display many 
programming paradigms, patterns and techniques. The emphasis was placed in the backend even though quite a few
interesting modules were implemented in the frontend.
There is a basic payment system enabled by Stripe, remote database connection through MongoDB Atlas, stateless
authentication through JWT, Google Maps for displaying location of objects, messaging through Stomp-WebSockets, reactive state management with NgRx and much more.

![alt text](https://github.com/AndiBraimllari/Express-Transport-Full-Stack/blob/master/ET-Home.png)

# CONTINUOUS DEVELOPMENT
There are a lot of features to be added in the project most of which are annotated by TODOs for DEVELOPMENT. As this is
a Work-In-Progress the project is continually evolving. The commit available is cherry picked from a private 
repository in GitHub.

![alt text](https://github.com/AndiBraimllari/Express-Transport-Full-Stack/blob/master/ET-Tracking.png)

# PRODUCTION USAGE
There are a lot of changes to be made to the code before being considering to deploy it in the real world. There is a
large portion of TODOs for PRODUCTION to assess. Moreover consider changing the email used and the secret keys of:
    
    Google Maps, JWT, Stripe, MongoDB Atlas

To serve the whole project as a fat .jar run:

    mvn package 
    
on the backend which wraps the Angular part (usually as index.html) and places it in the static folder inside the .war
folder. If you want to run the Angular separately consider using:
    
    ng build --prod
    
and work with the files generated inside the dist folder optimized for production.

![alt text](https://github.com/AndiBraimllari/Express-Transport-Full-Stack/blob/master/ET-SignUp.png)

![alt text](https://github.com/AndiBraimllari/Express-Transport-Full-Stack/blob/master/ET-Messaging.png)
