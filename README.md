# Game-21 
Twenty-one is a game of chance. The chance of winning is based on the cards dealt by the program. The game is similar to Blackjack, but differs in some areas, so please read this section carefully.

<h2>Rules</h2>

All players in the game place their bets after receiving their first card. Once everyone has placed their bets, the participants get a second card.

One by one, the players of the game get the opportunity to play. Each play, the players have the option to ‘stand’ (hold your total and end your turn), ‘hit’ (ask for a card to bring your points as close as possible to 21), or perform special actions (here only ‘split’). If a player has more than 21 points in his hand, he is ‘bust’, and his bets are lost.

If all players are ready (stand or bust) the bank must play (only if there are players who are not bust). The rules for the bank are simple: The bank must hit when it has a total of 16 points or less and must stand with a total of 17 points or more. When the bank and player have the same number of points, the bank wins. If the bank has more than 21 points, the bank is bust and all players that are standing, win.

When a player gets two identical cards, he can choose to ‘split’. This means that the cards are placed next to each other on the table and the player can play twice, one game per card.

The number of points for the cards is as follows:

<ul>
    <li>King 3 points, queen 2 points, jack 1 point.
    <li>Ace is 1 or 11 points of your choice.
    <li>Cards 2 to 10 have their normal point value.
    <li>The ‘suit’ of the card is not important.
    <li>The Joker does not play
</ul>
Note that the game cards must be pre-shuffled and that you cannot have more than 3 players per deck (for more players you will need more than one deck).

<h2>Implementation</h2>

The current prototype models the game rules with the classes in the folder 'model'.
Independent instances of the game model can be used by the game server and by each client app (player widget).
Folder 'components' shows angular components to visualize the status of the game on server as well as panels for each player 
to interact with the game-server. 

The test-app shows both the game and the panels for all players on one-page app for illustration and testing purposes.
A simple implementation of the game-server mockup in done in the 'mockupBackend.js'.
To communicate with actual server, this mockup file would be replaced with REST API client as shown 'ajaxBackend' 
(I skipped the design of the actual interface and server side as it requires more 
 time than I am willing to spend on the first assignment without initial feedback on the overall game design).

<h3>Assumptions</h3>
<ul>
    <li>I did not understand whether players have to play strictly one after another or they can play in any order.
    It is assumed now that the order does not matter because dealt cards or other player's intermediate scores 
    are not disclosed, the bank plays when all players are ready.
    <li>When a player gets a card that allows him to split but this card leads to the total score of > 21, the player is considered bust
</ul>

<h3>Build instructions</h3>
Run
<ul>
    <li> <code>npm install</code> to install all the dependencies
    <li ><code>npm run build</code> to compile the code
</ul>
