fetch("https://api.nobelprize.org/v1/prize.json")
  .then((data) => {
    return data.json();
  })
  .then((data2) => {
    for (var i = 0; i < data2.prizes.length; i++) {
      var year = parseInt(data2.prizes[i].year);
      //console.log(year);
      if (
        year >= 2000 &&
        year <= 2019 &&
        data2.prizes[i].category == "chemistry"
      ) {
        console.log(JSON.stringify(data2.prizes[i]));
      }
    }
  });
