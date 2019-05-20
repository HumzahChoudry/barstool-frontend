
### `npm install && npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### A few notes 

* need to account for overtime, right now it would show up as 5 in NBA but would be fine for baseball, we could extract out the logic that renders each quarter, inning etc for each sport. 

* No team records available so I just hardcoded one in.

* No team colors available, so I used the same ones. We could make a lookup if needed, which I did for the team logos

* made a league to sport helper method for switch statements, that way we can add multiple leagues to the same sport (makes sense for soccer or NCAA-NFL situations)
