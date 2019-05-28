import React from "react";
import { Table } from "semantic-ui-react";

export function renderBasketballTotalHeaders() {
  return <Table.HeaderCell>TOTAL</Table.HeaderCell>;
}

export function renderBasketballResults(prefix) {
  return (
    <>
      <Table.Cell active>
        {this.props.data[`${prefix}_totals`].points}
      </Table.Cell>
    </>
  );
}

export function renderBasketballStats() {
  const homeLogo = getTeamLogo(this.props.data, "home");
  const awayLogo = getTeamLogo(this.props.data, "away");
  return (
    <>
      <div className="all-player-stats">
        <div className="team-player-stats">
          <h3>
            {this.props.data.away_team.last_name}
            <img className="team-icon" alt="team-logo" src={awayLogo} />
          </h3>
          {renderBasketballPlayerStats(this.props.data, "away", true)}
          {renderBasketballPlayerStats(this.props.data, "away", false)}
        </div>
        <div className="team-player-stats">
          <h3>
            {this.props.data.home_team.last_name}
            <img className="team-icon" alt="team-logo" src={homeLogo} />
          </h3>
          {renderBasketballPlayerStats(this.props.data, "home", true)}
          {renderBasketballPlayerStats(this.props.data, "home", false)}
        </div>
      </div>
    </>
  );
}

export function renderBasketballPlayerStats(data, prefix, isStarter) {
  const logo = getTeamLogo(data, prefix);
  return (
    <>
      <Table
        striped
        sortable
        textAlign="center"
        attached="bottom"
        className="stats-table"
      >
        <Table.HeaderCell>{isStarter ? "Starters" : "Bench"}</Table.HeaderCell>
        <Table.HeaderCell>MIN</Table.HeaderCell>
        <Table.HeaderCell>FG</Table.HeaderCell>
        <Table.HeaderCell>3PT</Table.HeaderCell>
        <Table.HeaderCell>FT</Table.HeaderCell>

        <Table.HeaderCell>REB</Table.HeaderCell>
        <Table.HeaderCell>AST</Table.HeaderCell>
        <Table.HeaderCell>STL</Table.HeaderCell>
        <Table.HeaderCell>BLK</Table.HeaderCell>
        <Table.HeaderCell>TO</Table.HeaderCell>
        <Table.HeaderCell>PF</Table.HeaderCell>
        <Table.HeaderCell>PTS</Table.HeaderCell>
        {data[`${prefix}_stats`]
          .filter(s => s.is_starter === isStarter)
          .map(stats => {
            return (
              <Table.Row>
                <Table.Cell>{stats.display_name}</Table.Cell>
                <Table.Cell>{stats.minutes}</Table.Cell>
                <Table.Cell>
                  {stats.field_goals_made} - {stats.field_goals_attempted}
                </Table.Cell>
                <Table.Cell>
                  {stats.three_point_field_goals_made} -{" "}
                  {stats.three_point_field_goals_attempted}
                </Table.Cell>
                <Table.Cell>
                  {stats.free_throws_made} - {stats.free_throws_attempted}
                </Table.Cell>

                <Table.Cell>
                  {stats.offensive_rebounds + stats.defensive_rebounds}
                </Table.Cell>
                <Table.Cell>{stats.assists}</Table.Cell>
                <Table.Cell>{stats.steals}</Table.Cell>
                <Table.Cell>{stats.blocks}</Table.Cell>
                <Table.Cell>{stats.turnovers}</Table.Cell>
                <Table.Cell>{stats.personal_fouls}</Table.Cell>
                <Table.Cell>{stats.points}</Table.Cell>
              </Table.Row>
            );
          })}
      </Table>
    </>
  );
}

const getTeamLogo = (data, prefix) => {
  switch (data[`${prefix}_team`].team_id) {
    case "los-angeles-angels":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Angels_of_Anaheim.svg/1200px-Los_Angeles_Angels_of_Anaheim.svg.png";
    case "oklahoma-city-thunder":
      return "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/1200px-Oklahoma_City_Thunder.svg.png";
    case "miami-heat":
      return "https://images.homedepot-static.com/productImages/7f44bdc2-11e4-42e9-b206-6e6020540444/svn/red-applied-icon-wall-decals-nbop1601-64_1000.jpg";
    case "seattle-mariners":
      return "http://www.logospng.com/images/178/seattle-mariners-logo-png-transparent-amp-svg-vector-178132.png";
    default:
  }
};
