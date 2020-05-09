# De-idealize
> A very different dating app

![MainGameFinal](https://user-images.githubusercontent.com/23436377/80248279-e7ff9500-866f-11ea-8858-a1e5389c733b.png)

**De-idealize** is not the typical dating App. Unlike other similar apps, such as *Tinder* or *OkCupid*, on De-idealize you can only chat  with another user at a time, you begin matched to her/him and there must be an unmatch before trying to meet someone else. De-idealize is not a *“market of love”*, you don’t play with tons of users and their feelings  simultaneously and **there is not chance of ghosting**. If you don’t like them, they will know immediately. If there is chemistry, then both will be sure the other one is not flirting with someone else.

No hurt feelings anymore!

![hurts](https://user-images.githubusercontent.com/23436377/80244169-cb139380-8668-11ea-99a2-4c43015c7811.gif)


**Note:** De-idealize has been implemented using React as the client side framework. But, since it is intended to be used on a mobile device, there are plans for a future release on React Native.

## Installing
In order to run this project locally do the following (on both client and server folders except for step 1):

1. Clone the project
2. Run `npm install` to install all the dependencies
3. Change .envExample file name to .env and paste the required environment variables in the corresponding field 
4. Run `npm run dev` to launch the application and access it at localhost:port

## Game rules

* After login or signup you will be introduced to a random canditate, according to your own preferences.
  
![IntroduceFinal](https://user-images.githubusercontent.com/23436377/80248444-344ad500-8670-11ea-8c8e-f0262c995a82.png)
  
* When the other player is ready, you are able to enter to the game screen. At the top, you will find the name of the other person, three pics of her/him (initially blurred and revealed as the game progress) and the Match percentage. Notice that this score is at 100% at the beginning and **you won’t want it to fall below 60%**, or everything will be over!

* On the bottom, there is a text input, from where you can chat on turns. Just a message per turn, so don’t be boring, try to be creative and funny. Oh, by the way, don’t try to send your contact info (email, phone number…), our patented and incredibly smart AI will block the message.

![MainFinal](https://user-images.githubusercontent.com/23436377/80248521-5e9c9280-8670-11ea-8ba7-e6ebb5d071b5.png)

* **Very important:** on your turn look at the counter in the middle of the screen. Yes, those are seconds and a second is a small unit of time on a cosmic scale. Don’t let it reach zero, or everything will be over!
  
* Finally, each five turns, both players will be presented with a quick quiz. There are only two opposite options, and the players never know which one selects the other. If both players give the same answer the Match counter will increase. If not, it will decrease  (remember, never let it fall below 60%).

![QuizFinal](https://user-images.githubusercontent.com/23436377/80248587-84299c00-8670-11ea-8217-ada43815daab.png)


## Ending game

* The game may end on “Defeat” or “Victory”.
  
* There are two ways of reaching a defeat ending. The first one implies an active role by the players. If one of them don’t like the other, he or she may let the timer run down to zero (ok, it is a kind of gentle “quick ghosting”). The other way is decided by our magic AI, **if the Match score decreases under 60%, it means that you are not made for each other** and our AI can’t allow you to have offspring, for the benefit of the human race.
  
* **Important:** if the game ends in defeat, the other person will be blacklisted and you will never meet again. And when we say never, **it means NEVER!**
  
* But if against all odds, the players like what they see and what they read, then both users will have the chance of keeping on chatting  with no restrictions. Furthermore, they will have the opportunity of sharing private contact information to continue knowing each other by other ways ;)

![EndFinal](https://user-images.githubusercontent.com/23436377/80248667-b5a26780-8670-11ea-8dc4-a479aa9e5305.png)

**To do:**
* Quiz editor for admins
* Improve the regex method for blocking contact info 

## Technologies
* [React](https://reactjs.org/) for building the client side user interface
* [Material-UI](https://material-ui.com/) to get the structure and styling of the app
* [Express.js](https://expressjs.com/) as the foundation to build the app's backend
* [Mongoose.js](https://mongoosejs.com/) and [MongoDB](https://www.mongodb.com/) to handle platform models and database
* [Socket.IO](https://socket.io/) to provide a real-time, bidirectional and event-based communication

## Overview 
This is the third and last project to be made during the Ironhack Web Development Bootcamp. I have had the chance to apply all the knowledge acquired during the course to develop a full stack web application from scratch, using state-of-the-art technologies, such as **React** or **SocketIO**.

## Authors
<table>
<tr>
<td align="center"><a href="https://github.com/joseanher81"><img src="https://avatars3.githubusercontent.com/u/23436377?s=400&v=4" width="100px;" alt="Jose avatar"/><br/><sub><b>Jose Ángel Hernández</b></sub></a><br/><a href="https://github.com/joseanher81"></a>
</tr>
</table>