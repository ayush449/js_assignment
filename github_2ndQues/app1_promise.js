const userInput = window.prompt("Enter the repository name to search:");
// const userName = window.prompt("Enter the username to search:");
const url = `https://api.github.com/search/repositories?q=${userInput}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const results = data.items;
    //console.log(results);
    for (const item of results) {
      //console.log(item.owner.login);

      console.log({
        name: item.name,
        full_name: item.full_name,
        private: item.private,
        owner: {
          login: item.owner.login,
          name: item.owner.url,
          followersCount: item.owner.followers_url,
          followingCount: item.owner.following_url,
        },
        licenseName: item.license ? item.license.name : "N/A",
        score: item.score,
        numberOfBranch: item.branches_url,
      });
    }
  })
  .catch((error) => console.log(error));
