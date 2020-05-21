# Summary
SoundSpace is an application meant for sharing and discovering new music. On SoundSpace, users can create channels that will automatically cater to its listeners' musical interests through SoundSpace's voting system.

# Technology
### SoundSpace's front end is built with:
- React
- Redux
- Socket.io

SoundSpace is a single page application, offering a very fluid user experience for navigating and creating channels, or listening to and suggesting music from within a channel. Redux stores application-wide data on the front end, most importantly user data and active channels. Socket.io is utlized for music playback purposes, receiving Spotify song IDs and timestamp info from the back end. This is most important when joining a channel, so that your playback is synchronized with other listeners in the channel.

### The back end is built with:
- Node
- Express
- Passport
- Socket.io
- PostgreSQL / Sequelize

Socket.io is utilized to communicate to all users in a channel which songs to play, and the current timestamps. Data for the channels and their queues are stored in tables in Postgres. Passport enables user authentication through Spotify, and allows playback to occur in the SoundSpace application. The Spotify API is also used for music recommendation.

# How to Run
To run SoundSpace, please do the following:
- `git clone` the repo.
- Navigate into the directory and run `npm i`. This will install all dependencies.
- With `postgres` installed, run `createdb soundspace`. The database for SoundSpace must exist on the host machine.
- Run `npm start` and navigate to `localhost:8080`. Enjoy listening!
