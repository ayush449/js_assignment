async function searchrepo(){
    const userInput = window.prompt("Enter the repository name to search:");
    const userName = window.prompt("Enter the username to search:");
    const url = `https://api.github.com/search/repositories?q=${userInput}`;

    try{
      
        const response = await fetch(url);

        const data = await response.json();
        const results = data.items;
        
        for (const item of results) {
          if (item.owner.login === userName) {
            console.log("Name:", item.name);
            console.log("Full Name:", item.full_name);
            console.log("Private:", item.private);
            console.log("Owner:");
            console.log("- Login:", item.owner.login);
            console.log("- Name:", item.owner.url);
            console.log("- Followers Count:", item.owner.followers_url);
            console.log("- Following Count:", item.owner.following_url);
            console.log("License Name:", item.license ? item.license.name : "N/A");
            console.log("Score:", item.score);
            console.log("Number of Branches:", item.branches_url);
            
          }
        }

    }catch(error){
        console.log(error);
    }
}

searchrepo();