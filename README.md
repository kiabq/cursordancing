# cursordancing

## TODO:
- Client
  - [x] Initialize canvas to render user cursor
  - [x] Be able to render multiple cursors across multiple browsers
  - [x] Limit framerate to user framerate for optimal performance
  - [ ] Add controls for cursor customization and cursor movement (custom cursor, rotation, cursor size).
  - [ ] Add toast feature for connections and disconnections
- Server
  - [ ] Persist user information during sessions, including points, name, and room
  - [ ] Create a username for each socket
    - [ ] Optional: Allow users to create custom usernames 
  - [x] Create and handle multiple rooms that users can switch between
    - [ ] Allow users to create custom room names
  - [ ] Create a WS namespace for chats (global, room)
  - [ ] Handle room attendance 
