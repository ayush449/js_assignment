async function fetchAirlinesData() {
  try {
    const response = await fetch(
      "https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json"
    );
    const data = await response.json();
    const airportsData = data;
    console.log(airportsData);
    let sumCancelled = 0,
      sumDelayed = 0,
      sumDiverted = 0,
      sumOnTime = 0;

    let total = 0;
    airportsData.forEach((airport) => {
      sumCancelled += airport.Statistics.Flights.Cancelled;
      sumDelayed += airport.Statistics.Flights.Delayed;
      sumDiverted += airport.Statistics.Flights.Diverted;
      sumOnTime += airport.Statistics.Flights["On Time"];
      total += airport.Statistics.Flights.Total;
    });
    const totalFlights = sumCancelled + sumDelayed + sumDiverted + sumOnTime;

    console.log(totalFlights);
    console.log(total);
    if (totalFlights === total) {
      console.log("both value equal");
    } else {
      console.log("value doesnt match");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchAirlinesData();
