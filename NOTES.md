* need to account for overtime, right now it would show up as 5 in NBA but would be fine for baseball

* didn't write logic for in progress games bc the time info isn't included in the API call.

* No team records available

* No team colors available or icon, snagged logos from online. Team colors could be done the same way.

* made league to sport helper method for switch statements, that way we can add multiple leagues to the same sport (makes sense for soccer or NCAA/NFL situations)

- extracted sport specific rendering to sports folder, this way we can stay a bit more organized and not have too many methods in our BoxScore component.
