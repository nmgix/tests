const { RandomUser } = require("random-user-api");

const randomUser = new RandomUser().format("json");

// only output name, email and nationality for 3
randomUser
  .excludeAllFieldsBut("name")
  .and()
  .excludeAllFieldsBut("email")
  .and()
  .excludeAllFieldsBut("nat")
  .nationality("us")
  .and()
  .nationality("fr")
  .page(60)
  .nationality("ru")
  .count(60)
  .nationality("us")
  .count(60)
  .retrieve()
  .then((res) => {
    if (randomUser._format === "json") {
      console.log("RES:" + JSON.stringify(res));
      console.log(`number found: ${res.length}`);
    } else {
      console.log("something else");
    }
  })
  .catch((err) => console.log(`problem, err=${err}`));
