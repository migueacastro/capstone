import "../../../../../chunks/cinema.js";
function load({ params }) {
  return {
    id: params.id,
    type: "movies"
  };
}
export {
  load
};
