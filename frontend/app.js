function fetchAndDisplayJson() {
  fetch("/CMPE272_HW2_Twitter_Service/backend/twitter.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#jsonTable tbody");
      tableBody.innerHTML = "";
      data.forEach((item) => {
        const row = tableBody.insertRow();
        row.setAttribute("id", item.data.id.toString());
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = item.data.id;
        cell2.textContent = item.data.text;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

fetchAndDisplayJson();

function addTweet() {
  let tweet = document.getElementById("addTxt").value;
  let data = {
    text: tweet,
  };

  fetch("http://localhost:3000/twitter/add", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((obj) => {
      console.log(obj);
      fetchAndDisplayJson();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteTweet() {
  let tweet = document.getElementById("deleteTxt").value.toString();
  fetch(`http://localhost:3000/twitter/${tweet}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((obj) => {
      console.log(obj);
      fetchAndDisplayJson();
    })
    .catch((error) => {
      console.log(error);
    });
}
