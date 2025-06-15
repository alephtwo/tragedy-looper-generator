# Tragedy Looper Generator

[Tragedy Looper (惨劇 RoopeR)](https://boardgamegeek.com/boardgame/148319/tragedy-looper)
is a scenario-based deduction game where players take the roles of time
loopers attempting to prevent a tragedy.

## Impetus

One of the players takes on the role of the Mastermind, the overseer who is
responsible for running the game from the antagonist's standpoint. In order
to perform their tasks, the Mastermind follows a script which includes a
cast, a series of incidents, and various plots. Enterprising Masterminds are
able to use the rules of the game to write their own scripts and tell a
variety of stories.

The game provides numerous scripts throughout its base game and two expansions.
However, once a script has been played, it's essentially spoiled. At a
certain point, continuing to play the game will require effort from the
Mastermind to write a new script. This is not conducive to impromptu "game
night" play.

## Have a computer make scripts for you

Use the generator to randomly create a script.

Whenever possible, the published rules of the game are respected. For example,
if the "Sign with me!" plot is chosen, the Key Person is guaranteed to be a
Girl. Things that known to deviate from this are documented on the
[issue tracker](https://github.com/alephtwo/tragedy-looper-generator/issues).

The number of loops is calculated from the published rules of the game, with
a minimum of two loops (just to be sporting). Users should feel encouraged to
modify this as they see fit to alter the difficulty of their game.

## Parameters

The user has a few handles by which to determine the "feel" of the game:

- Tragedy Set
- Character Pools
- Number of Subplots (1 or 2)
- Cast Size (6-11)
- Number of Incidents (Between 0 and the minimum of days or cast size)
- Number of Days per Loop

A couple of things to note things to note:

- If the plot/roles require more incidents than have been requested, more
  incidents will be added.
- If there are more incidents than characters that can fulfill them, more
  characters will be added.

## Cheatsheet

Cheatsheets are a helpful way for the mastermind to get an overview of all
relevant triggers and abilities that they will need during the game. This
saves the effort of looking through a small-print reference card and can
greatly speed up the resolution of said abilities.

## Development

To start a local development server, just run:

```shell
npm start
```

Code linting can be done with:

```shell
# Autoformat using Prettier
npm run format

# Ensure everything is linted
npm run lint
```

To build the production bundle, run:

```shell
npm run build
```

## Acknowledgements

Last Liar and Another Horizon are Tragedy Sets that do not have an official
English translation. As a result, this implementation relies on a fan
translation provided by [@andrewshen123](https://boardgamegeek.com/user/andrewshen123)
[over on BoardGameGeek](https://boardgamegeek.com/thread/2770511/article/38982680#38982680).
Be sure to give them your thanks if you get use out of it!
