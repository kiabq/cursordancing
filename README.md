# cursordancing (DEAD)

![Peek 2023-09-19 20-02](https://github.com/kiabq/cursordancing/assets/44178907/ae952a27-95e7-4558-84e9-012ce69bbedf)


## TODO:
- Client
  - [x] Initialize canvas to render user cursor
  - [x] Be able to render multiple cursors across multiple browsers
  - [x] Limit framerate to user framerate for optimal performance
  - [ ] Add controls for cursor customization and cursor movement (custom cursor, rotation, cursor size).
  - [ ] Add toast feature for connections and disconnections
- Server
  - [x] Create a namespace for each room  
  - [ ] Persist user information during sessions, including points, name, and room
  - [ ] Create a username for each socket
    - [ ] Optional: Allow users to create custom usernames 
  - [x] Create and handle multiple rooms that users can switch between
    - [ ] Allow users to create custom room names
  - [ ] Create a WS namespace for chats (global, room)
  - [ ] Handle room attendance 
