const baseURL = "https://api.github.com";

export async function getRepoCommitInfo(repoName, repoOwner) {
  // const repoOwner = "Depersonalizc";
  // const repoName = "CSC4001-Better-SIS";
  const targetURL = `${baseURL}/repos/${repoOwner}/${repoName}/commits`;

  try {
    let resp = await( fetch(targetURL, {
      method: "GET",
      mode: "cors",
    }) );
    let json = await( resp.json() );
    // console.log(`typeof json = ${ Object.prototype.toString.call(json) }`);

    // here, json is an array type
    let outputArray = [];
    for (let index in json) {
      if (!json[index]["author"]) {
        continue;
      }
      let obj = json[index]["commit"]
      outputArray.push( {
        author: obj["author"]["name"],
        time: obj["author"]["date"],
        email: obj["author"]["email"],
        avatar_url: json[index]["author"]["avatar_url"],
        mesg: obj["message"],
        url: json[index]["html_url"],
      } );
    }
    // console.log(`getGitHubRepoCommitInfo: outputArray = ${outputArray}`);

    return new Promise((resolve, reject) => {
      resolve(outputArray);
    });
  }
  catch(error) {
    console.log(error);
  }
};