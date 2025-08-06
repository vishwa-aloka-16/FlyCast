const data = {
  AIRLINE: "DL",
  ORIGIN: "LAX",
  DEST: "JFK",
  MONTH: 1,
  DAY_OF_WEEK: 1,
  DEP_HOUR: 1,
};

fetch("http://localhost:5000/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((res) => {
    document.body.innerText = `Delay Probability: ${res.delay_probability} (${res.delay_percent})`;
  })
  .catch((err) => {
    document.body.innerText = `Error: ${err}`;
  });
