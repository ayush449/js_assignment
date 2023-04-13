function search(callback) {
  const userInput = window.prompt("Enter the repository name to search:");
  // const userName = window.prompt("Enter the username to search:");
  const url = `https://api.github.com/search/repositories?q=${userInput}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data.items;
      const repositories = [];
      for (const item of results) {
        repositories.push({
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
      callback(null, repositories);
    })
    .catch((error) => callback(error, null));
}

function displayRepositories(error, repositories) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(repositories);
}

search(displayRepositories);
