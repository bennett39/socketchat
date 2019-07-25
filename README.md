# socketchat

![Screencast of socketchat](http://bennettgarner.com/images/screen-socketchat.gif)

An anonymous chat application that uses SocketIO to instantly push new messages to all connected clients. Can deploy as a standalone app or as a chat component in a larger application.

Uses jQuery and the SocketIO client on the frontend. NodeJS backend. All message data is stored client-side, meaning chats disappear once you've left the session and the backend has no storage overhead.

Deployed to Google Cloud with manual worker scaling so sockets are consistent for all users.

[See it in action](http://socketchat39.herokuapp.com/)
