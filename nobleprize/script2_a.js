async function prizeselection() {
  try {
    const response = await fetch("https://api.nobelprize.org/v1/prize.json");

    const data2 = await response.json();
    data2.prizes
      .filter(
        (prize) =>
          prize.category === "chemistry" &&
          parseInt(prize.year) >= 2000 &&
          parseInt(prize.year) <= 2019
      )
      .forEach((prize) => console.log(prize));
  } catch (error) {
    console.log(error);
  }
}

prizeselection();
