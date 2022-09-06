# Test app for Гексагон

Have to make frontend part of service for shortening links.

# Problems

1. Better way was to choose Next.js to secure ip adress of server.
2. Didn't have time to write tests (at least Cypress).
3. Didn't figure out how to properly setup `homepage` so for local build it has to be set to `'.'`.
4. Lots of repeats in styling, such as `display: flex e.t.c.`, `:not(:***_child)`, meeting the deadline was a priority.

### How to launch

1. Setup `.env` by example:

```json
      REACT_APP_SERVER_ADRESS="http://XX.XXX.XX.XXX"
      REACT_APP_LOGIN_PATH="/login"
      REACT_APP_REGISTER_PATH="/register"
      REACT_APP_STATISTICS_PATH="/statistics"
      REACT_APP_SQUEEZE_PATH="/squeeze"

      REACT_APP_LINKS_PER_LIST=12
```

2. `npm run start` for launching locally (port 3000) or build docker image with `docker-compose build && docker-compose up` (port 80)
   > Empty root bug may occur, delete `package-json.lock` and try composing again, also check is `homepage` set to `'.'`.

# Have to do [`38`/`38`]:

1. [x] Components
   1. [x] Basic Components
      1. [x] Input
         1. [x] Text
         2. [x] Checkbox
         3. [x] Switch
         4. [x] Custom text state switch
      2. [x] Button
         1. [x] Link
      3. [x] Squeezed text
      4. [x] Hover Block
      5. [x] Modal
      6. [x] Loading
      7. [x] Custom Image
      8. [x] Line
      9. [x] Description
      10. [x] Form
      11. [x] Title
      12. [x] Small Title
   2. [x] Page Components
      1. [x] Greet Description
      2. [x] Share BLock
      3. [x] Other Links
      4. [x] Content (Folder)
         1. [x] Content Header
         2. [x] Content Main
         3. [x] Pagination
      5. [x] Content
      6. [x] Header
      7. [x] StyledPage
2. [x] Pages
   1. [x] Login
   2. [x] Registration
   3. [x] User
   4. [x] Redirect
3. [x] Router
4. [x] Functionality
5. [x] Docker
