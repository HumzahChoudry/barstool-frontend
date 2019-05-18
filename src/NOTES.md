* need to account for overtime, right now it would show up as 5 in NBA but would be fine for baseball

* assuming scores array will have null if the quarter/inning hasn't taken place, that way we can check time by looking for first null. If I had to guess though, "event_information" would have the time info

* No team records available

* No team colors available or icon, so I used the same ones. We could make a lookup if needed.

* make league to sport helper method for switch statements, that way we can add multiple leagues to the same sport (makes sense for soccer or NCAA-NFL situations)
