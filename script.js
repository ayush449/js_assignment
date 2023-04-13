var xhttp = new XMLHttpRequest();
xhttp.open("GET", "battles2.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // console.log(this.responseText);
    var data = JSON.parse(this.responseText);

    let awins = 0;
    let alosses = 0;
    let battleTypes = {};
    let defenderSize = [];

    for (var i = 0; i < data.length; i++) {
      var current_battle = data[i];
      if (current_battle.attacker_outcome == "win") {
        awins++;
      } else {
        alosses++;
      }

      battleTypes[current_battle.battle_type] = true;
      if (current_battle.defender_size != null) {
        defenderSize.push(current_battle.defender_size);
      }
    }

    var defenderSizeStats = {
      average: 0,
      min: Infinity,
      max: 0,
    };
    var sum = 0;
    for (var i = 0; i < defenderSize.length; i++) {
      var size = defenderSize[i];

      sum += size;
      if (size < defenderSizeStats.min) {
        defenderSizeStats.min = size;
      }
      if (size > defenderSizeStats.max) {
        defenderSizeStats.max = size;
      }
    }

    let kingCountsa = {};
    let kingCountsd = {};
    let regionCounts = {};

    for (let i = 0; i < data.length; i++) {
      let attackerKing = data[i].attacker_king;
      let defenderKing = data[i].defender_king;
      if (attackerKing in kingCountsa) {
        kingCountsa[attackerKing]++;
      } else {
        kingCountsa[attackerKing] = 1;
      }
      if (defenderKing in kingCountsd) {
        kingCountsd[defenderKing]++;
      } else {
        kingCountsd[defenderKing] = 1;
      }

      let region = data[i].region;
      if (region in regionCounts) {
        regionCounts[region]++;
      } else {
        regionCounts[region] = 1;
      }
    }

    let maxAttackerKing = "";
    let maxDefenderKing = "";
    let maxAttackerCount = 0;
    let maxDefenderCount = 0;

    for (let king in kingCountsa) {
      if (kingCountsa[king] > maxAttackerCount && king !== "") {
        maxAttackerKing = king;
        maxAttackerCount = kingCountsa[king];
      }
    }

    for (let king in kingCountsd) {
      if (kingCountsd[king] > maxDefenderCount && king !== "") {
        maxDefenderKing = king;
        maxDefenderCount = kingCountsd[king];
      }
    }

    let maxRegion = "";
    let maxRegionCount = 0;

    for (let region in regionCounts) {
      if (regionCounts[region] > maxRegionCount && region !== "") {
        maxRegion = region;
        maxRegionCount = regionCounts[region];
      }
    }

    let maxBattleNumber = 0;
    let maxBattleName = "";

    for (let i = 0; i < data.length; i++) {
      if (data[i].battle_number > maxBattleNumber) {
        maxBattleNumber = data[i].battle_number;
        maxBattleName = data[i].name;
      }
    }

    defenderSizeStats.average = sum / defenderSize.length;
    var result = {
      most_active: {
        attacker_king: maxAttackerKing,
        defender_king: maxDefenderKing,
        region: maxRegion,
        name: maxBattleName,
      },
      attacker_outcome: {
        win: awins,
        loss: alosses,
      },
      battle_type: Object.keys(battleTypes),
      defender_size: defenderSizeStats,
    };
    console.log(result);
  }
};
