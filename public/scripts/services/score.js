const db = firebase.firestore;
const scores = db().collection("scores");

//IIFE => Immediately Invoked Function Expression

const Score = (() => {
  async function update({ name, score, level }) {
    await scores.doc().set({
      name: name,
      score: score,
      levelNo: level,
    });
  }

  function create_get() {
    let startAfter;
    let leaderboardListNomore = false;
    let topTenPlayers = [];

    return async function ({ limit }) {
      const downArrow = document.querySelector("#leaderboard-scrollLoading");
      let query = scores.orderBy("score", "desc");
      if (startAfter) query = query.startAfter(startAfter);
      if (leaderboardListNomore === true) return topTenPlayers;
      startLoading(downArrow);
      const querySnapshotPlayers = await query.limit(limit).get();
      if (querySnapshotPlayers.docs.length < limit)
        leaderboardListNomore = true;
      querySnapshotPlayers.forEach((doc) => {
        const res = doc.data();
        res.id = doc.id;
        topTenPlayers.push(res);
      });
      startAfter = topTenPlayers[topTenPlayers.length - 1].score;
      stopLoading(downArrow);
      return topTenPlayers;
    };
  }

  const Obj = {
    update,
    create_get,
  };

  return Obj;
})();
