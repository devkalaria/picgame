const db = firebase.firestore;
const scores = db().collection("scores");

//IIFE => Immediately Invoked Function Expression

const Score = (() => {
  async function update({ name, score, level }) {
    scores.doc().set({
      name: playerName,
      score: score,
      levelNo: levelNo,
    });
  }

  async function get() {
    const topTenPlayers = [];
    const querySnapshotPlayers = await scores
      .orderBy("score", "desc")
      .limit(10)
      .get();
    querySnapshotPlayers.forEach((doc) => {
      topTenPlayers.push(doc.data());
    });
    return topTenPlayers;
  }

  const Obj = {
    update,
    get,
  };

  return Obj;
})();
